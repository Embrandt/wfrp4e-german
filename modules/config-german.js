Hooks.once("setup", async function () {

    const WFRP4E = {}

    game.wfrp4e.config.PrepareSystemItems = function () {

        this.systemItems = foundry.utils.mergeObject(this.systemItems, {
            reload: {
                type: "extendedTest",
                name: "",
                system: {
                    SL: {},
                    test: {
                        value: ""
                    },
                    completion: {
                        value: "remove"
                    }
                },
                flags: {
                    wfrp4e: {
                        reloading: ""
                    }
                }
            },
            improv: {
                name: game.i18n.localize("NAME.Improvised"),
                type: "weapon",
                effects: [],
                system: {
                    damage: {value: "SB + 1"},
                    reach: {value: "personal"},
                    weaponGroup: {value: "basic"},
                    twohanded: {value: false},
                    qualities: {value: []},
                    flaws: {value: [{name: "undamaging"}]},
                    special: {value: ""},
                    range: {value: ""},
                    ammunitionGroup: {value: ""},
                    offhand: {value: false},
                }
            },
            stomp: {
                name: game.i18n.localize("NAME.Stomp"),
                type: "trait",
                effects: [],
                system: {
                    specification: {value: 0},
                    rollable: {
                        value: true,
                        rollCharacteristic: "ws",
                        bonusCharacteristic: "s",
                        defaultDifficulty: "challenging",
                        damage: true,
                        SL: true,
                        skill: game.i18n.localize("NAME.MeleeBrawling")
                    },
                }
            },
            unarmed: {
                name: game.i18n.localize("NAME.Unarmed"),
                type: "weapon",
                effects: [],
                system: {
                    damage: {value: "SB + 0"},
                    reach: {value: "personal"},
                    weaponGroup: {value: "brawling"},
                    twohanded: {value: false},
                    qualities: {value: []},
                    flaws: {value: [{name: "undamaging"}]},
                    special: {value: ""},
                    range: {value: ""},
                    ammunitionGroup: {value: ""},
                    offhand: {value: false},
                }
            },

            fear: {
                name: game.i18n.localize("NAME.FearExtendedTest"),
                type: "extendedTest",
                system: {
                    completion: {value: 'remove'},
                    description: {type: 'String', label: 'Description', value: ''},
                    failingDecreases: {value: true},
                    gmdescription: {type: 'String', label: 'Description', value: ''},
                    hide: {test: false, progress: false},
                    negativePossible: {value: false},
                    SL: {current: 0, target: 1},
                    test: {value: game.i18n.localize("NAME.Cool")}
                },
                flags: {
                    wfrp4e: {
                        fear: true
                    }
                },
                effects:
                    [{
                        name: game.i18n.localize("NAME.Fear"),
                        img: "systems/wfrp4e/icons/conditions/fear.png",
                        statuses: ["fear"],
                        system: {
                            transferData: {},
                            scriptData: [
                                {
                                    label: "@effect.flags.wfrp4e.dialogTitle",
                                    trigger: "dialog",
                                    script: `args.fields.slBonus -= 1`,
                                    options: {
                                        hideScript: "",
                                        activateScript: `return args.data.targets[0]?.name == this.item.flags.wfrp4e?.fearName`
                                    }
                                },
                                {
                                    label: "@effect.name",
                                    trigger: "immediate",
                                    script: `
                                    let name = this.item?.flags?.wfrp4e?.fearName
                                    this.effect.updateSource({"flags.wfrp4e.dialogTitle" : (name ? game.i18n.format("EFFECT.AffectTheSourceOfFearName", {name}) : game.i18n.format("EFFECT.AffectTheSourceOfFear"))})
                                    if (name)
                                    {
                                        this.item.updateSource({name : this.item.name + " (" + name + ")" })
                                    }
                                    `
                                }
                            ]
                        }
                    }
                    ]

            },

            terror: {
                name: game.i18n.localize("NAME.Terror"),
                img: "systems/wfrp4e/icons/conditions/terror.png",
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "immediate",
                            script: `
                        let terror = this.effect.flags.wfrp4e.terrorValue;
                        let skillName = game.i18n.localize("NAME.Cool");
                        let test = await args.actor.setupSkill(skillName, {terror: true, appendTitle : " - Terror", skipTargets: true});
                        await test.roll();
                        await this.actor.applyFear(terror, name)
                        if (test.failed)
                        {
                            if (test.result.SL < 0)
                                terror += Math.abs(test.result.SL)

                            await this.actor.addCondition("broken", terror)
                        }
                        `
                        }
                    ]
                },
            }
        });


        this.systemEffects = foundry.utils.mergeObject(this.systemEffects, {
            "fear": {
                name: game.i18n.localize("NAME.Fear"),
                img: "systems/wfrp4e/icons/conditions/fear.png",
                statuses: ["fear"],
                flags: {
                    wfrp4e: {
                        transferData: {},
                        scriptData: [
                            {
                                label: "@effect.flags.wfrp4e.dialogTitle",
                                trigger: "dialog",
                                script: `args.fields.slBonus -= 1`,
                                options: {
                                    hideScript: "",
                                    activateScript: `return args.data.targets[0]?.name == this.item.flags.wfrp4e?.fearName`
                                }
                            },
                            {
                                label: "@effect.name",
                                trigger: "immediate",
                                script: `
                            let name = this.item?.flags?.wfrp4e?.fearName
                            this.effect.updateSource({"flags.wfrp4e.dialogTitle" : (name ? game.i18n.format("EFFECT.AffectTheSourceOfFearName", {name}) : game.i18n.format("EFFECT.AffectTheSourceOfFear"))})
                            if (name)
                            {
                                this.item.updateSource({name : this.item.name + " (" + name + ")" })
                            }
                            `
                            }
                        ]
                    }
                }
            },
            "enc1": {
                name: game.i18n.localize("EFFECT.Encumbrance") + " 1",
                img: "systems/wfrp4e/icons/effects/enc1.png",
                statuses: ["enc1"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "prePrepareData",
                            script: `
                            args.actor.characteristics.ag.modifier -= 10;

                            if (args.actor.details.move.value > 3)
                            {
                                args.actor.details.move.value -= 1;
                                if (args.actor.details.move.value < 3)
                                    args.actor.details.move.value = 3
                            }
                            `
                        }
                    ]
                }
            },
            "enc2": {
                name: game.i18n.localize("EFFECT.Encumbrance") + " 2",
                img: "systems/wfrp4e/icons/effects/enc2.png",
                statuses: ["enc2"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "prePrepareData",
                            script: `
                            args.actor.characteristics.ag.modifier -= 20;
                            if (args.actor.details.move.value > 2)
                            {
                                args.actor.details.move.value -= 2;
                                if (args.actor.details.move.value < 2)
                                    args.actor.details.move.value = 2
                            }
                            `
                        }
                    ]
                }
            },
            "enc3": {
                name: game.i18n.localize("EFFECT.Encumbrance") + " 3",
                img: "systems/wfrp4e/icons/effects/enc3.png",
                statuses: ["enc3"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "prePrepareData",
                            script: "args.actor.details.move.value = 0;"
                        }
                    ]
                }
            },
            "cold1": {
                name: game.i18n.localize("EFFECT.ColdExposure") + " 1",
                img: "",
                statuses: ["cold1"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -10},
                ]
            },
            "cold2": {
                name: game.i18n.localize("EFFECT.ColdExposure") + " 2",
                img: "",
                statuses: ["cold2"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ws.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.s.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.i.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.int.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.fel.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.s.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.wp.calculationBonusModifier", mode: 2, value: 1},
                ]
            },
            "cold3": {
                name: game.i18n.localize("EFFECT.ColdExposure") + " 3",
                img: "",
                statuses: ["cold3"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "manual",
                            script: `
                            let tb = this.actor.characteristics.t.bonus
                            let damage = (await new Roll("1d10").roll()).total
                            damage -= tb
                            if (damage <= 0) damage = 1
                            if (this.actor.status.wounds.value <= damage) {
                                await this.actor.addCondition("unconscious")
                            }
                            this.actor.modifyWounds(-damage)
                            ui.notifications.notify(game.i18n.format("TookDamage", { damage: damage }))
                            `
                        }
                    ]
                }
            },
            "heat1": {
                name: game.i18n.localize("EFFECT.HeatExposure") + " 1",
                img: "",
                statuses: ["heat1"],
                changes: [
                    {key: "system.characteristics.int.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.calculationBonusModifier", mode: 2, value: 1},
                ]
            },
            "heat2": {
                name: game.i18n.localize("EFFECT.HeatExposure") + " 2",
                img: "",
                statuses: ["heat2"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ws.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.s.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.i.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.int.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.fel.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.s.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.wp.calculationBonusModifier", mode: 2, value: 1},
                ]
            },
            "heat3": {
                name: game.i18n.localize("EFFECT.HeatExposure") + " 3",
                img: "",
                statuses: ["heat3"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "manual",
                            script: `
                            let tb = this.actor.characteristics.t.bonus
                            let damage = (await new Roll("1d10").roll()).total
                            damage -= tb
                            if (damage <= 0) {
                                damage = 1
                            }
                            this.actor.modifyWounds(-damage)
                            ui.notifications.notify(game.i18n.format("TookDamage", { damage: damage }))
                            `
                        }
                    ]
                }
            },
            "thirst1": {
                name: game.i18n.localize("EFFECT.Thirst") + " 1",
                img: "",
                statuses: ["thirst1"],
                changes: [
                    {key: "system.characteristics.int.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.fel.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.calculationBonusModifier", mode: 2, value: 1},
                ]
            },
            "thirst2": {
                name: game.i18n.localize("EFFECT.Thirst") + " 2+",
                img: "",
                statuses: ["thirst2"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ws.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.s.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.i.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.int.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.fel.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.s.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.wp.calculationBonusModifier", mode: 2, value: 1},
                ],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "manual",
                            script: `
                            let tb = this.actor.characteristics.t.bonus
                            let damage = (await new Roll("1d10").roll()).total
                            damage -= tb
                            if (damage <= 0) {
                                damage = 1
                            }
                            this.actor.modifyWounds(-damage)
                            ui.notifications.notify(game.i18n.format("TookDamage", { damage: damage }))
                            `
                        }
                    ]
                }
            },
            "starvation1": {
                name: game.i18n.localize("EFFECT.Starvation") + " 1",
                img: "",
                statuses: ["starvation1"],
                changes: [
                    {key: "system.characteristics.s.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.s.calculationBonusModifier", mode: 2, value: 1},
                ]
            },
            "starvation2": {
                name: game.i18n.localize("EFFECT.Starvation") + " 2",
                img: "",
                statuses: ["starvation2"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ws.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.s.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.i.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.int.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.wp.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.fel.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.t.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.s.calculationBonusModifier", mode: 2, value: 1},
                    {key: "system.characteristics.wp.calculationBonusModifier", mode: 2, value: 1},
                ],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "manual",
                            script: `
                            let tb = this.actor.characteristics.t.bonus
                            let damage = (await new Roll("1d10").roll()).total
                            damage -= tb
                            if (damage <= 0) {
                                damage = 1
                            }
                            this.actor.modifyWounds(-damage)
                            ui.notifications.notify(game.i18n.format("TookDamage", { damage: damage }))
                            `
                        }
                    ]
                }
            },
            "blackpowder": {
                name: game.i18n.localize("EFFECT.BlackpowderShock"),
                img: "",
                statuses: ["blackpowder"],
                flags: {
                    wfrp4e: {
                        blackpowder: true,
                    },
                },

                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "immediate",
                            script: `
                            test = await this.actor.setupSkill(game.i18n.localize("NAME.Cool"), {appendTitle : " - " + this.effect.name, skipTargets: true, fields : {difficulty : "average"}});
                            await test.roll();
                            if (test.failed)
                            {
                                this.actor.addCondition("broken");
                            }
                            return false;
                        `
                        }
                    ]
                }
            },
            "infighting": {
                name: game.i18n.localize("EFFECT.Infighting"),
                img: "modules/wfrp4e-core/icons/talents/in-fighter.png",
                statuses: ["infighting"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "prePrepareItem",
                            script: `
                            if (args.item.type == "weapon" && args.item.isEquipped)
                            {
                                let weaponLength = args.item.reachNum
                                if (weaponLength > 3)
                                {
                                    let improv = foundry.utils.duplicate(game.wfrp4e.config.systemItems.improv)
                                    improv.system.twohanded.value = args.item.twohanded.value
                                    improv.system.offhand.value = args.item.offhand.value
                                    improv.name = args.item.name + " (" + game.i18n.localize("EFFECT.Infighting") + ")"
                                    foundry.utils.mergeObject(args.item.system, improv.system, {overwrite : true})
                                    args.item.system.qualities = improv.system.qualities
                                    args.item.system.flaws = improv.system.flaws
                                    args.item.name = improv.name
                                    args.item.system.infighting = true;
                                }
                            }
                            `
                        }
                    ]
                }
            },
            "defensive": {
                name: game.i18n.localize("EFFECT.OnDefensive"),
                img: "",
                statuses: ["defensive"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "dialog",
                            script: `args.prefillModifiers.modifier += 20`,
                            options: {
                                hideScript: "return !this.actor.isOpposing",
                                activateScript: `
                                    let skillName = this.effect.name.substring(this.effect.name.indexOf("[") + 1, this.effect.name.indexOf("]"))
                                    return args.skill?.name == skillName
                                `
                            }
                        },
                        {
                            label: "@effect.name",
                            trigger: "immediate",
                            script: `
                                let choice = await ItemDialog.create(this.actor.itemTypes.skill.sort((a, b) => a.name > b.name ? 1 : -1), 1, "Escoge una habilidad con la que usar A la Defensiva");    
                                this.effect.updateSource({name : this.effect.name + " [" +  choice[0]?.name + "]"})
                                `
                        }
                    ]
                }
            },
            "dualwielder": {
                name: game.i18n.localize("EFFECT.DualWielder"),
                img: "modules/wfrp4e-core/icons/talents/dual-wielder.png",
                statuses: ["dualwielder"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "dialog",
                            script: `args.prefillModifiers.modifier -= 10`,
                            options: {
                                hideScript: "return !this.actor.isOpposing",
                                activateScript: `return this.actor.isOpposing`
                            }
                        },
                        {
                            label: "Comienzo del Turno",
                            trigger: "startTurn",
                            script: `this.effect.delete()`,
                        }
                    ]
                }
            },
            "consumealcohol1": {
                name: game.i18n.localize("EFFECT.ConsumeAlcohol") + " 1",
                img: "",
                statuses: ["consumealcohol1"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.ws.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.int.modifier", mode: 2, value: -10},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -10},
                ]
            },
            "consumealcohol2": {
                name: game.i18n.localize("EFFECT.ConsumeAlcohol") + " 2",
                img: "",
                statuses: ["consumealcohol2"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -20},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -20},
                    {key: "system.characteristics.ws.modifier", mode: 2, value: -20},
                    {key: "system.characteristics.int.modifier", mode: 2, value: -20},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -20},
                ]
            },
            "consumealcohol3": {
                name: game.i18n.localize("EFFECT.ConsumeAlcohol") + " 3",
                img: "",
                statuses: ["consumealcohol3"],
                changes: [
                    {key: "system.characteristics.bs.modifier", mode: 2, value: -30},
                    {key: "system.characteristics.ag.modifier", mode: 2, value: -30},
                    {key: "system.characteristics.ws.modifier", mode: 2, value: -30},
                    {key: "system.characteristics.int.modifier", mode: 2, value: -30},
                    {key: "system.characteristics.dex.modifier", mode: 2, value: -30},
                ]
            },
            "stinkingdrunk1": {
                name: game.i18n.localize("EFFECT.MarienburghersCourage"),
                img: "",
                statuses: ["stinkingdrunk1"],
                system: {
                    transferData: {},
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "dialog",
                            script: `args.prefillModifiers.modifier += 20`,
                            options: {
                                hideScript: "return args.skill?.name != game.i18n.localize('NAME.Cool')",
                                activateScript: `return args.skill?.name == game.i18n.localize('NAME.Cool')`
                            }
                        }
                    ]
                }
            }
        })

        game.wfrp4e.config.statusEffects = [
            {
                img: "systems/wfrp4e/icons/conditions/bleeding.png",
                id: "bleeding",
                statuses: ["bleeding"],
                name: "WFRP4E.ConditionName.Bleeding",
                description: "WFRP4E.Conditions.Bleeding",
                system: {
                    condition: {
                        value: 1,
                        numbered: true,
                        trigger: "endRound"
                    },
                    scriptData: [
                        {
                            trigger: "manual",
                            label: "@effect.name",
                            script: `let uiaBleeding = game.settings.get("wfrp4e", "uiaBleeding");
                            let actor = this.actor;
                            let effect = this.effect;
                            let bleedingAmt;
                            let bleedingRoll;
                            let msg = ""

                            let damage = effect.conditionValue;
                            let scriptArgs = {msg, damage};
                            await Promise.all(actor.runScripts("preApplyCondition", {effect, data : scriptArgs}))
                            msg = scriptArgs.msg;
                            damage = scriptArgs.damage;
                            msg += await actor.applyBasicDamage(damage, {damageType : game.wfrp4e.config.DAMAGE_TYPE.IGNORE_ALL, minimumOne : false, suppressMsg : true})

                            if (actor.status.wounds.value == 0 && !actor.hasCondition("unconscious"))
                            {
                                addBleedingUnconscious = async () => {
                                    await actor.addCondition("unconscious")
                                    msg += "<br>" + game.i18n.format("BleedUnc", {name: actor.prototypeToken.name })
                                }
                                if (uiaBleeding) {
                                    test = await actor.setupSkill(game.i18n.localize("NAME.Endurance"), {appendTitle : " - " + this.effect.name, skipTargets: true, fields : {difficulty : "challenging"}});
                                    await test.roll();
                                    if (test.failed) {
                                        await addBleedingUnconscious();
                                    }
                                } else {
                                    await addBleedingUnconscious();
                                }
                            }

                            if (actor.hasCondition("unconscious"))
                            {
                                bleedingAmt = effect.conditionValue;
                                bleedingRoll = (await new Roll("1d100").roll()).total;
                                if (bleedingRoll <= bleedingAmt * 10)
                                {
                                    msg += "<br>" + game.i18n.format("BleedFail", {name: actor.prototypeToken.name}) + " (" + game.i18n.localize("Rolled") + " " + bleedingRoll + ")";
                                    await actor.addCondition("dead")
                                }
                                else if (bleedingRoll % 11 == 0)
                                {
                                    msg += "<br>" + game.i18n.format("BleedCrit", { name: actor.prototypeToken.name } ) + " (" + game.i18n.localize("Rolled") + bleedingRoll + ")"
                                    await actor.removeCondition("bleeding")
                                }
                                else
                                {
                                    msg += "<br>" + game.i18n.localize("BleedRoll") + ": " + bleedingRoll;
                                }
                            }

                            await Promise.all(actor.runScripts("applyCondition", {effect, data : {bleedingRoll}}))
                            if (args.suppressMessage)
                            {
                                let messageData = game.wfrp4e.utility.chatDataSetup(msg);
                                messageData.speaker = {alias: this.effect.name}
                                messageData.flavor = this.effect.name;
                                return messageData
                            }
                            else
                            {
                                return this.script.message(msg)
                            }
                            `
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/poisoned.png",
                id: "poisoned",
                statuses: ["poisoned"],
                name: "WFRP4E.ConditionName.Poisoned",
                description: "WFRP4E.Conditions.Poisoned",
                system: {
                    condition: {
                        value: 1,
                        numbered: true,
                        trigger: "endRound"
                    },
                    scriptData: [
                        {
                            trigger: "manual",
                            label: "@effect.name",
                            script: `let actor = this.actor;
                            let effect = this.effect;
                            let msg = ""

                            let damage = effect.conditionValue;
                            let scriptArgs = {msg, damage};
                            await Promise.all(actor.runScripts("preApplyCondition", {effect, data : scriptArgs}))
                            msg = scriptArgs.msg;
                            damage = scriptArgs.damage;
                            msg += await actor.applyBasicDamage(damage, {damageType : game.wfrp4e.config.DAMAGE_TYPE.IGNORE_ALL, suppressMsg : true})

                            await Promise.all(actor.runScripts("applyCondition", {effect}))
                            if (args.suppressMessage)
                            {
                                let messageData = game.wfrp4e.utility.chatDataSetup(msg);
                                messageData.speaker = {alias: this.effect.name}
                                return messageData
                            }
                            else
                            {
                                return this.script.message(msg)
                            }
                            `
                        },
                        {
                            trigger: "dialog",
                            label: "@effect.name",
                            script: `args.fields.modifier -= 10 * this.effect.conditionValue`,
                            options: {
                                activateScript: "return true"
                            }
                        }
                    ]
                }

            },
            {
                img: "systems/wfrp4e/icons/conditions/ablaze.png",
                id: "ablaze",
                statuses: ["ablaze"],
                name: "WFRP4E.ConditionName.Ablaze",
                description: "WFRP4E.Conditions.Ablaze",
                system: {
                    condition: {
                        value: 1,
                        numbered: true,
                        trigger: "endRound"
                    },
                    scriptData: [
                        {
                            trigger: "manual",
                            label: "@effect.name",
                            script: `let leastProtectedLoc;
                            let leastProtectedValue = 999;
                            for (let loc in this.actor.status.armour)
                            {
                                if (this.actor.status.armour[loc].value != undefined && this.actor.status.armour[loc].value < leastProtectedValue)
                                {
                                    leastProtectedLoc = loc;
                                    leastProtectedValue = this.actor.status.armour[loc].value;
                                }
                            }

                            let formula = "1d10 + @effect.conditionValue - 1"
                            let msg = "<b>${game.i18n.localize("Formula")}</b>: @FORMULA"

                            let scriptArgs = {msg, formula}
                            await Promise.all(this.actor.runScripts("preApplyCondition", {effect : this.effect, data : scriptArgs}));
                            formula = scriptArgs.formula;
                            msg = scriptArgs.msg;
                            let roll = await new Roll(formula, this).roll();
                            let terms = roll.terms.map(i => (i instanceof Die ? (i.formula + " (" + i.total + ")") : (i.total))).join("")
                            msg = msg.replace("@FORMULA", terms);

                            let damageMsg = ("<br>" + await this.actor.applyBasicDamage(roll.total, {loc: leastProtectedLoc, suppressMsg : true})).split("")
                            msg += damageMsg.join("");
                            await Promise.all(this.actor.runScripts("applyCondition", {effect : this.effect}))
                            if (args.suppressMessage)
                            {
                                let messageData = game.wfrp4e.utility.chatDataSetup(msg);
                                messageData.speaker = {alias: this.actor.prototypeToken.name}
                                messageData.flavor = this.effect.name
                                return messageData
                            }
                            else
                            {
                                return this.script.message(msg)
                            }
                            `
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/deafened.png",
                id: "deafened",
                statuses: ["deafened"],
                name: "WFRP4E.ConditionName.Deafened",
                description: "WFRP4E.Conditions.Deafened",
                system: {
                    condition: {
                        value: 1,
                        numbered: true
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Würfe im Bezug aufs Gehör",
                            script: `args.fields.modifier -= 10 * this.effect.conditionValue`
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/stunned.png",
                id: "stunned",
                statuses: ["stunned"],
                name: "WFRP4E.ConditionName.Stunned",
                system: {
                    condition: {
                        value: 1,
                        numbered: true
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Abzüge auf alle Tests (@effect.name)",
                            script: `args.fields.modifier -= 10 * this.effect.conditionValue`,
                            options: {
                                activateScript: "return true"
                            }
                        }
                        // { // Not sure what to do about this
                        //     trigger: "dialog",
                        //     label : "Bonus to Melee Attacks",
                        //     script : `args.fields.modifier -= 10 * this.effect.conditionValue`,
                        //     "options.dialog.targeter" : true
                        // }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/entangled.png",
                id: "entangled",
                statuses: ["entangled"],
                name: "WFRP4E.ConditionName.Entangled",
                description: "WFRP4E.Conditions.Entangled",
                system: {
                    condition: {
                        value: 1,
                        numbered: true
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Tests im Zusammenhang mit jeglicher Art der Bewegung",
                            script: `args.fields.modifier -= 10 * this.effect.conditionValue`,
                            options: {
                                activateScript: "return ['ws', 'bs', 'ag'].includes(args.characteristic)"
                            }
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/fatigued.png",
                id: "fatigued",
                statuses: ["fatigued"],
                name: "WFRP4E.ConditionName.Fatigued",
                description: "WFRP4E.Conditions.Fatigued",
                system: {
                    condition: {
                        value: 1,
                        numbered: true
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Abzüge auf alle Tests (@effect.name)",
                            script: `args.fields.modifier -= 10 * this.effect.conditionValue`,
                            options: {
                                activateScript: "return true"
                            }
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/blinded.png",
                id: "blinded",
                statuses: ["blinded"],
                name: "WFRP4E.ConditionName.Blinded",
                description: "WFRP4E.Conditions.Blinded",
                system: {
                    condition: {
                        value: 1,
                        numbered: true
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Tests die Sicht erfordern",
                            script: `args.fields.modifier -= 10 * this.effect.conditionValue`,
                            options: {
                                activateScript: "return ['ws', 'bs', 'ag'].includes(args.characteristic)"
                            }
                        },
                        {
                            trigger: "dialog",
                            label: "Bonus für Nahkampfangriffe",
                            script: `args.fields.modifier += 10 * this.effect.conditionValue`,
                            options: {
                                targeter: true,
                                hideScript: "return args.item?.attackType != 'melee'",
                                activateScript: "return args.item?.attackType == 'melee'"
                            }
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/broken.png",
                id: "broken",
                statuses: ["broken"],
                name: "WFRP4E.ConditionName.Broken",
                description: "WFRP4E.Conditions.Broken",
                system: {
                    condition: {
                        value: 1,
                        numbered: true
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Strafe für alle Tests, die nicht mit Rennen und Verstecken verbunden sind.",
                            script: `args.fields.modifier -= 10 * this.effect.conditionValue`,
                            options: {
                                activateScript: "return !args.skill?.name?.includes(game.i18n.localize('NAME.Stealth')) && args.skill?.name != game.i18n.localize('NAME.Athletics')"
                            }
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/prone.png",
                id: "prone",
                statuses: ["prone"],
                name: "WFRP4E.ConditionName.Prone",
                description: "WFRP4E.Conditions.Prone",
                system: {
                    condition: {
                        value: null,
                        numbered: false
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Tests im Zusammenhang mit jeglicher Art der Bewegung",
                            script: `args.fields.modifier -= 20`,
                            options: {
                                activateScript: "return ['ws', 'bs', 'ag'].includes(args.characteristic)"
                            }
                        },
                        {
                            trigger: "dialog",
                            label: "Bonus für Nahkampfangriffe",
                            script: `args.fields.modifier += 20`,
                            options: {
                                targeter: true,
                                hideScript: "return args.item?.system.attackType != 'melee'",
                                activateScript: "return args.item?.system.attackType == 'melee'"
                            }
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/surprised.png",
                id: "surprised",
                statuses: ["surprised"],
                name: "WFRP4E.ConditionName.Surprised",
                description: "WFRP4E.Conditions.Surprised",
                system: {
                    condition: {
                        value: null,
                        numbered: false
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "Bonus für Nahkampfangriffe",
                            script: `args.fields.modifier += 20`,
                            options: {
                                targeter: true,
                                hideScript: "return args.item?.system.attackType != 'melee'",
                                activateScript: "return args.item?.system.attackType == 'melee'"
                            }
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/unconscious.png",
                id: "unconscious",
                statuses: ["unconscious"],
                name: "WFRP4E.ConditionName.Unconscious",
                description: "WFRP4E.Conditions.Unconscious",
                system: {
                    condition: {
                        value: null,
                        numbered: false
                    },
                }
            },
            {
                img: "systems/wfrp4e/icons/conditions/grappling.png",
                id: "grappling",
                statuses: ["grappling"],
                name: "WFRP4E.ConditionName.Grappling",
                description: "WFRP4E.Conditions.Grappling",
                system: {
                    condition: {
                        value: null,
                        numbered: false
                    },
                }

            },
            {
                img: "systems/wfrp4e/icons/conditions/engaged.png",
                id: "engaged",
                statuses: ["engaged"],
                name: "WFRP4E.ConditionName.Engaged",
                description: "WFRP4E.Conditions.Engaged",
                system: {
                    condition: {
                        value: null,
                        numbered: false
                    },
                    scriptData: [
                        {
                            trigger: "dialog",
                            label: "@effect.name",
                            script: `args.abort = true
                        ui.notifications.error(game.i18n.localize("EFFECT.ShooterEngagedError"))`,
                            options: {
                                hideScript: "return !args.weapon || args.weapon.isMelee || args.weapon.properties.qualities.pistol",
                                activateScript: "return args.weapon.isRanged && !args.weapon.properties.qualities.pistol"
                            }
                        }
                    ]
                }
            },
            {
                img: "systems/wfrp4e/icons/defeated.png",
                id: "dead",
                statuses: ["dead"],
                name: "WFRP4E.ConditionName.Dead",
                description: "WFRP4E.Conditions.Dead",
                system: {
                    condition: {
                        value: null,
                        numbered: false
                    },
                }
            }
        ]


        foundry.utils.mergeObject(this.propertyEffects, {

            // Qualities
            accurate: {
                name: game.i18n.localize("PROPERTY.Accurate"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item"
                    },
                    scriptData: [{
                        label: game.i18n.localize("PROPERTY.Accurate"),
                        trigger: "dialog",
                        script: "args.fields.modifier += 10;",
                        options: {
                            hideScript: "",
                            activateScript: "return true"
                        }
                    },
                        {
                            label: "Script",
                            trigger: "manual",
                            script: "this.script.notification('test')",
                        }
                    ],
                }
            },
            blackpowder: {
                img: "systems/wfrp4e/icons/blank.png",
                name: game.i18n.localize("EFFECT.BlackpowderShock"),
                system: {
                    transferData: {
                        type: "target",
                        documentType: "Actor"
                    },
                    scriptData: [
                        {
                            label: "@effect.name",
                            trigger: "immediate",
                            script: `
                            test = await this.actor.setupSkill(game.i18n.localize("NAME.Cool"), {appendTitle : " - " + this.effect.name, skipTargets: true, fields : {difficulty : "average"}});
                            await test.roll();
                            if (test.failed)
                            {
                                this.actor.addCondition("broken");
                            }
                            return false;
                        `
                        }
                    ]
                }
            },
            blast: {
                name: game.i18n.localize("PROPERTY.Blast"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item"
                    },
                    scriptData: [{
                        label: game.i18n.localize("PROPERTY.Blast"),
                        trigger: "rollWeaponTest",
                        script: "if (args.test.succeeded) args.result.other.push(`<a class='aoe-template' data-type='radius'><i class='fas fa-ruler-combined'></i>Explosión de ${this.item.properties.qualities.blast.value} yardas</a>`)",
                    }]
                }
            },
            damaging: {
                name: game.i18n.localize("PROPERTY.Damaging"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            defensive: {
                name: game.i18n.localize("PROPERTY.Defensive"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Actor",
                        equipTransfer: true
                    },
                    scriptData: [{
                        label: game.i18n.localize("PROPERTY.Defensive"),
                        trigger: "dialog",
                        script: "args.fields.slBonus++;",
                        options: {
                            activateScript: "return args.actor.attacker",
                            hideScript: "return !args.actor.attacker"
                        }
                    }]
                }
            },
            distract: {
                name: game.i18n.localize("PROPERTY.Distract"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            entangle: {
                name: game.i18n.localize("PROPERTY.Entangle"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                    scriptData: [{
                        label: game.i18n.localize("PROPERTY.Entangle"),
                        trigger: "applyDamage",
                        script: "args.actor.addCondition('entangled')"
                    }]
                }

            },
            fast: {
                name: game.i18n.localize("PROPERTY.Fast"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            hack: {
                name: game.i18n.localize("PROPERTY.Hack"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            impact: {
                name: game.i18n.localize("PROPERTY.Impact"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            impale: {
                name: game.i18n.localize("PROPERTY.Impale"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            magical: {
                name: game.i18n.localize("PROPERTY.Magical"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            penetrating: {
                name: game.i18n.localize("PROPERTY.Penetrating"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            pistol: {
                name: game.i18n.localize("PROPERTY.Pistol"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            precise: {
                name: game.i18n.localize("PROPERTY.Precise"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item"
                    },
                    scriptData: [{
                        label: game.i18n.localize("PROPERTY.Precise"),
                        trigger: "dialog",
                        script: "args.fields.successBonus += 1;",
                        options: {
                            hideScript: "",
                            activateScript: "return true"
                        }
                    }]
                }
            },
            pummel: {
                name: game.i18n.localize("PROPERTY.Pummel"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            repeater: {
                name: game.i18n.localize("PROPERTY.Repeater"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            shield: {
                name: game.i18n.localize("PROPERTY.Shield"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            trapblade: {
                name: game.i18n.localize("PROPERTY.TrapBlade"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            unbreakable: {
                name: game.i18n.localize("PROPERTY.Unbreakable"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            wrap: {
                name: game.i18n.localize("PROPERTY.Wrap"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },


            // Flaws
            dangerous: {
                name: game.i18n.localize("PROPERTY.Dangerous"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            imprecise: {
                name: game.i18n.localize("PROPERTY.Imprecise"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item"
                    },
                    scriptData: [{
                        label: game.i18n.localize("PROPERTY.Imprecise"),
                        trigger: "dialog",
                        script: "args.fields.slBonus -= 1;",
                        options: {
                            hideScript: "",
                            activateScript: "return true"
                        }
                    }]
                }
            },
            reload: {
                name: game.i18n.localize("PROPERTY.Reload"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            slow: {
                name: game.i18n.localize("PROPERTY.Slow"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            tiring: {
                name: game.i18n.localize("PROPERTY.Tiring"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
            undamaging: {
                name: game.i18n.localize("PROPERTY.Undamaging"),
                img: "systems/wfrp4e/icons/blank.png",
                system: {
                    transferData: {
                        documentType: "Item",
                    },
                }
            },
        })

    }

    game.wfrp4e.config.species = {
        "human": "Mensch",
        "dwarf": "Zwerg",
        "halfling": "Halbling",
        "helf": "Hochelf",
        "welf": "Waldelf",
    };

    game.wfrp4e.config.speciesSkills = {
        "human": [
            "Tierpflege",
            "Charme",
            "Besonnenheit",
            "Schätzen",
            "Klatsch",
            "Feilschen",
            "Sprache (Bretonisch)",
            "Sprache (Ödländisch)",
            "Anführen",
            "Wissen (Reikland)",
            "Nahkampf (Standard)",
            "Fernkampf (Bogen)"
        ],
        "dwarf": [
            "Zechen",
            "Besonnenheit",
            "Ausdauer",
            "Unterhalten (Erzählen)",
            "Schätzen",
            "Einschüchtern",
            "Sprache (Khazalid)",
            "Wissen (Zwerge)",
            "Wissen (Geologie)",
            "Wissen (Metallurgie)",
            "Nahkampf (Standard)",
            "Beruf (1 nach Wahl)"
        ],
        "halfling": [
            "Charme",
            "Zechen",
            "Ausweichen",
            "Glücksspiel",
            "Feilschen",
            "Intuition",
            "Sprache (Mootländisch)",
            "Wissen (Reikland)",
            "Wahrnehmung",
            "Fingerfertigkeit",
            "Schleichen (1 nach Wahl)",
            "Beruf (Koch)"
        ],
        "helf": [
            "Besonnenheit",
            "Unterhalten (Singen)",
            "Schätzen",
            "Sprache (Elthárin)",
            "Anführen",
            "Nahkampf (Standard)",
            "Navigation",
            "Wahrnehmung",
            "Musizieren (1 nach Wahl)",
            "Fernkampf (Bogen)",
            "Segeln",
            "Schwimmen"
        ],
        "welf": [
            "Athletik",
            "Klettern",
            "Ausdauer",
            "Unterhalten (Singen)",
            "Einschüchtern",
            "Sprache (Elthárin)",
            "Nahkampf (Standard)",
            "Überleben",
            "Wahrnehmung",
            "Fernkampf (Bogen)",
            "Schleichen (Land)",
            "Spurenlesen"
        ],
    }

    game.wfrp4e.config.speciesTalents = {
        "human": [
            "Unkenruf",
            "Gerissenheit, Einnehmendes Wesen",
            3
        ],
        "dwarf": [
            "Magieresistenz",
            "Nachtsicht",
            "Lesen und Schreiben, Unerbittlich",
            "Entschlossen, Willensstärke",
            "Stämmig",
            0
        ],
        "halfling": [
            "Scharfer Sinn (Geschmack)",
            "Nachtsicht",
            "Resistenz (Chaos)",
            "Zierlich",
            2
        ],
        "helf": [
            "Scharfer Sinn (Sicht)",
            "Kühler Kopf, Gerissenheit",
            "Nachtsicht",
            "Zweites Gesicht, Sechster Sinn",
            "Lesen und Schreiben",
            0
        ],
        "welf": [
            "Scharfer Sinn (Sicht)",
            "Robustheit, Zweites Gesicht",
            "Nachtsicht",
            "Lesen und Schreiben, Unverwüstlich",
            "Streuner",
            0
        ]
    }

    game.wfrp4e.config.subspecies = {
        human: {
            reiklander: {
                name: "Reikländer",
                skills: [
                    "Tierpflege",
                    "Charme",
                    "Besonnenheit",
                    "Schätzen",
                    "Klatsch",
                    "Feilschen",
                    "Sprache (Bretonisch)",
                    "Sprache (Ödländisch)",
                    "Anführen",
                    "Wissen (Reikland)",
                    "Nahkampf (Standard)",
                    "Fernkampf (Bogen)"
                ],
                talents: [
                    "Unkenruf",
                    "Gerissenheit, Einnehmendes Wesen",
                    3
                ]
            }
        }
    }

    game.wfrp4e.config.classTrappings = {
        "Akademiker": "Kleidung, Dolch, Beutel, Umhängetasche, Schreibzeug, Blätter Pergament (1w10)",
        "Bürger": "Kleidung, Umhang, Hut, Dolch, Beutel, Umhängetasche, Mahlzeit",
        "Höflinge": "Edle Gewandung, Dolch, Beutel, Pinzette, Ohrlöffel, Kamm",
        "Landvolk": "Kleidung, Umhang, Dolch, Beutel, Umhängetasche, Ration (1 Tag)",
        "Campesino": "Bandolera que contiene Raciones (1 día), Capa, Daga, Ropas, Bolsa",
        "Freisassen": "Kleidung, Umhang, Dolch, Beutel, Rucksack, Zunderkästchen, Decke, Ration (1 Tag)",
        "Flussvolk": "Kleidung, Umhang, Dolch, Beutel, Umhängetasche, Schnapsflasche",
        "Gesetzlose": "Kleidung, Gugel oder Maske, Dolch, Beutel, Umhängetasche, Kerze, Kerze, Zündhölzer (1w10)",
        "Krieger": "Kleidung, Dolch, Handwaffe, Beutel",
    }

})