import {TranslatedCompendium} from "../babele/script/translated-compendium.js"
import { effects } from "./modules/effects.js";

Hooks.on('init', () => {

    if(typeof Babele !== 'undefined') {
        game.babele.register({
            module: 'wfrp4e-german-wip',
            lang: 'de',
            dir: 'compendium'
        });

game.babele.registerConverters({

      "career_class": (value) => { // Clases
        if ( value == "Academics" ) return "Akademiker";
        if ( value == "Academic" ) return "Akademiker";
        if ( value == "Burghers" ) return "Bürger";
        if ( value == "Burgher" ) return "Bürger";
        if ( value == "Courtiers" ) return "Höflinge";
        if ( value == "Courtier" ) return "Höfling";
        if ( value == "Peasants" ) return "Landvolk";
        if ( value == "Peasant" ) return "Landvolk";
        if ( value == "Rangers" ) return "Freisassen";
        if ( value == "Ranger" ) return "Freisasse";
        if ( value == "Riverfolk" ) return "Flussvolk";
        if ( value == "Rogues" ) return "Gesetzlose";
        if ( value == "Rogue" ) return "Gesetzloser";
        if ( value == "Warriors" ) return "Krieger";
        if ( value == "Warrior" ) return "Krieger";
	},

      "career_careergroup": (value) => { // Grupo de carrera
        if ( value == "Apothecary" ) return "Apotheker";
        if ( value == "Noble" ) return "Adeliger";
        if ( value == "Engineer" ) return "Technicus";
        if ( value == "Lawyer" ) return "Advokat";
        if ( value == "Nun" ) return "Mönch";
        if ( value == "Physician" ) return "Medicus";
        if ( value == "Priest" ) return "Priester";
        if ( value == "Scholar" ) return "Gelehrter";
        if ( value == "Wizard" ) return "Zauberer";
        if ( value == "Agitator" ) return "Agitator";
        if ( value == "Artisan" ) return "Handwerker";
        if ( value == "Beggar" ) return "Bettler";
        if ( value == "Investigator" ) return "Ermittler";
        if ( value == "Merchant" ) return "Händler";
        if ( value == "Rat Catcher" ) return "Rattenfänger";
        if ( value == "Townsman" ) return "Städter";
        if ( value == "Watchman" ) return "Wachman";
        if ( value == "Advisor" ) return "Berater";
        if ( value == "Artist" ) return "Künstler";
        if ( value == "Duellist" ) return "Duellist";
        if ( value == "Envoy" ) return "Gesandter";
        if ( value == "Servant" ) return "Diener";
        if ( value == "Spy" ) return "Spion";
        if ( value == "Warden" ) return "Meier";
        if ( value == "Bailiff" ) return "Büttel";
        if ( value == "Hedge Witch" ) return "Heckenhexer";
        if ( value == "Herbalist" ) return "Kräuterkundiger";
        if ( value == "Hunter" ) return "Jäger";
        if ( value == "Miner" ) return "Bergmann";
        if ( value == "Mystic" ) return "Mystiker";
        if ( value == "Scout" ) return "Kundschafter";
        if ( value == "Villager" ) return "Dörfler";
        if ( value == "Bounty Hunter" ) return "Kopfgeldjäger";
        if ( value == "Coachman" ) return "Kutscher";
        if ( value == "Entertainer" ) return "Schausteller";
        if ( value == "Flagellant" ) return "Flagellant";
        if ( value == "Messenger" ) return "Bote";
        if ( value == "Pedlar" ) return "Hausierer";
        if ( value == "Road warden" ) return "Straßenwächter";
        if ( value == "Witch Hunter" ) return "Hexenjäger";
        if ( value == "Boatman" ) return "Flussschiffer";
        if ( value == "Huffer" ) return "Lotse";
        if ( value == "Riverwarden" ) return "Flusswächter";
        if ( value == "Riverwoman" ) return "Flussbewohner";
        if ( value == "Seaman" ) return "Seeman";
        if ( value == "Smuggler" ) return "Schmuggler";
        if ( value == "Stevedore" ) return "Stauer";
        if ( value == "Wrecker" ) return "Strandräuber";
        if ( value == "Bawd" ) return "Kuppler";
        if ( value == "Charlatan" ) return "Scharlatan";
        if ( value == "Fence" ) return "Hehler";
        if ( value == "Grave Robber" ) return "Grabräuber";
        if ( value == "Outlaw" ) return "Bandit";
        if ( value == "Racketeer" ) return "Halunke";
        if ( value == "Thief" ) return "Dieb";
        if ( value == "Witch" ) return "Hexer";
        if ( value == "Cavalryman" ) return "Kavallerist";
        if ( value == "Guard" ) return "Wächter";
        if ( value == "Knight" ) return "Ritter";
        if ( value == "Pit Fighter" ) return "Grubenkämpfer";
        if ( value == "Protagonist" ) return "Gedungener";
        if ( value == "Soldier" ) return "Soldat";
        if ( value == "Slayer" ) return "Slayer";
        if ( value == "Warrior Priest" ) return "Kriegerpriester";
	},
	
	"talents_specification": (value) => {
	     if ( value == "Target" ) return "Ziel";
	     if ( value == "Everything" ) return "Alles";
         if ( value == "Greenskins" ) return "Grünhäute";
     	 if ( value == "Dwarfs" ) return "Zwerge";
	     if ( value == "Elves" ) return "Elfen";
	     if ( value == "Predators" ) return "Raubtiere";
	     if ( value == "Living" ) return "Lebendig";
	},
      
	"traits_specification": (value) => {
	     if ( value == "Any" ) return "1 nach Wahl";
         if ( value == "Rating" ) return "Wert";
         if ( value == "Target" ) return "Objetivo";
	     if ( value == "Damage" ) return "Schaden";
         if ( value == "Deity" ) return "Gottheit";
         if ( value == "Trained Skills" ) return "Trained Skills";
         if ( value == "# (Type)" ) return "# (Typ)";
	     if ( value == "Target #" ) return "# Ziele";
	     if ( value == "Type" ) return "Typ";
         if ( value == "Size" ) return "Größe";
         if ( value == "Tiny" ) return "Winzig";
         if ( value == "Little" ) return "Klein";
       	 if ( value == "Small" ) return "Zierlich";
     	 if ( value == "Average" ) return "Normal";
     	 if ( value == "Large" ) return "Groß";
     	 if ( value == "Enormous" ) return "Enorm";
	     if ( value == "Monstrous" ) return "Monströs";
         if ( value == "Corruption Strength" ) return "Stärke der Korruption";
	     if ( value == "Minor" ) return "Gering";
	     if ( value == "Moderate" ) return "Moderat";
	     if ( value == "Major" ) return "Schwer";
         if ( value == "Difficulty" ) return "Schwierigkeit";
	     if ( value == "Very Easy" ) return "Sehr einfach";
	     if ( value == "Easy" ) return "Einfach";
	     if ( value == "Average" ) return "Durchschnittlich";
	     if ( value == "Challenging" ) return "Herausfordernd";
	     if ( value == "Difficult" ) return "Schwierig";
	     if ( value == "Hard" ) return "Schwer";
	     if ( value == "Very Hard" ) return "Sehr schwer";
         if ( value == "Lore" ) return "Wind";
	     if ( value == "Petty" ) return "Niedere";
	     if ( value == "Beasts" ) return "Bestien";
	     if ( value == "Death" ) return "Tod";
	     if ( value == "Fire" ) return "Feuer";
	     if ( value == "Heavens" ) return "Himmel";
	     if ( value == "Life" ) return "Leben";
	     if ( value == "Light" ) return "Licht";
	     if ( value == "Shadow" ) return "Schatten";
	     if ( value == "Hedgecraft" ) return "Heckenhexerei";
	     if ( value == "Witchcraft" ) return "Hexerei";
	     if ( value == "Necromancy" ) return "Nekromantie";
	     if ( value == "Daemonology" ) return "Dämonologie";
	     if ( value == "Chaos" ) return "Chaos";
	     if ( value == "Any Chaos" ) return "beliebiges Chaos";
	     if ( value == "Any Lore" ) return "jeder Wind";
	     if ( value == "Poison" ) return "Gift";
     	 if ( value == "Venom" ) return "Gift";
	     if ( value == "Broken" ) return "Demoralisiert";
     	 if ( value == "Drive" ) return "Fahren";
	     if ( value == "Entertain" ) return "Unterhalten";
	     if ( value == "Fetch" ) return "Fangen";
	     if ( value == "Guard" ) return "Guard";
     	 if ( value == "Home" ) return "Home";
	     if ( value == "Magic" ) return "Magie";
	     if ( value == "Mount" ) return "Mount";
	     if ( value == "War" ) return "Krieg";
	     if ( value == "Sigmarites" ) return "Sigmariten";
	     if ( value == "Witch" ) return "Hexe";
	     if ( value == "the Rich, Beastmen" ) return "the Rich, Beastmen";
	     if ( value == "Bailiffs, Lawyers" ) return "Bailiffs, Lawyers";
	     if ( value == "Itching Pox" ) return "Itching Pox";
	     if ( value == "Packer's Pox" ) return "Packer's Pox";
	     if ( value == "Ratte Fever" ) return "Ratte Fever";
	     if ( value == "The Black Plague" ) return "The Black Plague";
	     if ( value == "Various" ) return "Various";
	     if ( value == "Choose one" ) return "Wähle eins";
	     if ( value == "Choose two" ) return "Wähle zwei";
	     if ( value == "Everything" ) return "Alle";
	     if ( value == "Greenskins" ) return "Grünhäute";
	     if ( value == "Dwarfs" ) return "Zwerge";
	     if ( value == "Elves" ) return "Elfen";
	     if ( value == "Thin People" ) return "Dünne Leute";
	},

	"criticals_wounds": (value) => {
         if ( value == "Death" ) return "Tod";
	},

	"criticals_location": (value) => {  // kritische Trefferzonen
         if ( value == "Head" ) return "Kopf";
         if ( value == "Arm" ) return "Arm";
	     if ( value == "Leg" ) return "Bein";
         if ( value == "Body" ) return "Körper";
	},
	
	"trappings_penalty": (value) => {  // Abzüge der Ausrüstung
         if ( value == "-10 Perception" ) return "-10 Wahrnehmung";
	     if ( value == "-20 Perception" ) return "-20 Wahrnehmung";
	     if ( value == "-10 Stealth" ) return "–10 Schleichen";
	},

	"trappings_range": (value) => {  // Weapon range ballistic
	     if ( value == "As weapon" ) return "As weapon";
	     if ( value == "Half weapon" ) return "Half weapon";
	     if ( value == "Third weapon" ) return "Third weapon";
	     if ( value == "Quarter weapon" ) return "Quarter weapon";
	     if ( value == "Twice weapon" ) return "Twice weapon";
	},
	
	"injuries_location": (value) => {
	     if ( value == "Head" ) return "Kopf";
	     if ( value == "Ear" ) return "Ohr";
	     if ( value == "Nose" ) return "Nase";
	     if ( value == "Eye" ) return "Auge";
	     if ( value == "Teeth" ) return "Zähne";
	     if ( value == "Tongue" ) return "Zunge";
	     if ( value == "Body" ) return "Körper";
	     if ( value == "Arm" ) return "Arm";
	     if ( value == "Hand" ) return "Hand";
	     if ( value == "Leg" ) return "Bein";
	     if ( value == "Foot" ) return "Fuß";
	     if ( value == "Toe" ) return "Zeh";
	},
	"injuries_duration": (value) => {
	     if ( value == "30 - TB" ) return "30 - WIB";
	     if ( value == "30 - TB days" ) return "30 - WIB";
	},

	"disease_units": (value) => {
	     if ( value == "days" ) return "Tage";
	     if ( value == "hours" ) return "Stunden";
	     if ( value == "minutes" ) return "Minuten";
	},
	
	"diaries_folder": (value) => {
	     if ( value == "Core Rulebook" ) return "Grundregelwerk";
	     if ( value == "Career Tables" ) return "Karrieretabellen";
	     if ( value == "Character Creation" ) return "Charakter Erstellung";
	     if ( value == "Corruption & Mutation Tables" ) return "Tabellen für Korruption und Mutationen";
	     if ( value == "Critical Hit Tables" ) return "Tabelle für kritische Treffer";
	     if ( value == "GM Booklet" ) return "Spielleiter Schirm";
	     if ( value == "Hit Location" ) return "Treffer Tabelle";
	     if ( value == "Moo's Homebrew" ) return "Moo's Homebrew";
	},
	
	"effects": effects,

	"bestiary_gender": (value) => {
	     if ( value == "Male" ) return "Männlich";
	     if ( value == "Female" ) return "Weiblich";
	     if ( value == "???" ) return "???";
	     if ( value == "Varies" ) return "Divers";
	},

  });
 }
    
});
