// A File for every text in the app
/* DEVELOPER NOTES:
- Try to keep the localization objects for screens in order of apperance in the app itself
- When using localization in pages, always import as localization
- When components are only used in a specific page they will be localizaed in the object for that page. when it is used in multiple pages it will be localized in a seperate object
*/


// Components
export const components = {
    GenericButton: {
        continue: {
            he: "המשך",
            en: "Continue",
        },
        previous: {
            he: "חזור",
            en: "Previous",
        },
        skip: {
            he: "דלג",
            en: "Skip",
        },
        home: {
            he: "מסך בית",
            en: "Home",
        }
    },
    sideMenu: {
        allExercises: { en: "All Exercises", he: "לכל התרגילים" },
        sortExercises: { en: "Sort Exercises", he: "מיון תרגילים" },
        meditations: { en: "Meditations", he: "מדיטציות" },
        content: { en: "Content", he: "תוכן" },
        settings: { en: "Settings", he: "הגדרות" },
    },
    genderToggleButton: {
        male: { en: "Male", he: "קריין" },
        female: { en: "Female", he: "קריינית" }
    },
    langBottomSheet: {
        choose: { en: "Choose a language", he: "בחר שפה" },
        approve: { en: "Approve", he: "אישור" }
    }
}

// General Screens

export const settings = {
    title: { en: "Settings", he: "הגדרות" },
    prompts: {
        language: { en: "Language", he: "שפה" },
        doNotDisturb: { en: "Do not disturb", he: "מצב לא להפריע" },
        sound: { en: "Turn off sound", he: "לכבות קול?" },
        yourGender: { en: "You are...", he: "איך לפנות אלייך?" },
        timer: { en: "Turn off timer", he: "לכבות טיימר?" },
        narratorVoice: { en: "Narrator voice", he: "קול הקריין" },
        emergencyContact: { en: "Emergency Contact", he: "הגדרת אנשי קשר" },
    },
    buttons: {
        enableAccessToContacts: { en: "Allow access to contacts", he: "אפשר גישה לאנשי קשר" },
        genderSelectOptions: {
            male: {he: 'זכר', en: 'Male'},
            female: {he: 'נקבה', en: 'Female'},
            plural: {he: 'רבים',en: 'Plural'},
        },
        language: {he: 'עברית', en: 'English'},
    },
    emergencyContactExplanation: {
        en: "Would you like to notify a loved one that you had a" +
            "panic attack?\nIf so, than choose a person from your contacts.",
        he: "האם תרצו ליידע את קרוביכם שחוויתם התקף חרדה? \nאם כן אנא בחרו איש קשר מהרשימה."
    },
}

export const home = {
    header: { en: "You are not alone", he: "אתם לא לבד", ar: "أنت لست وحدك" },
    buttons: {
        start: {
            en: "I want help",
            he: "אני רוצה עזרה >",
            ar: "أحتاج المساعدة",
        },
        languages: { he: "עברית 🌐", en: "🌐 English" },
        privacy: { he: "פרטיות", en: "Privacy" }
    }
}

export const finish = {
    header: {
        he: "אנחנו פה בשבילכם.\nאתם לא לבד!",
        en: "We are here for you\nYou are not alone.",
    },
    body: {
        he: "האפליקציה אינה תחליף לגורם מקצועי.\n\nבמידה והינכם עדיין חשים ברע רצוי לפנות למוקדי סיוע כמו ער”ן \n\nאו אפילו ליצור קשר עם אדם קרוב.",
        en: "Please note: This app is not a replacement for professional assistance. If things don't get better, reach out to support centers",
    },
    feedback: {
        he: "נשמח לשמוע מה דעתכם",
        en: "We would love to hear from you",
    },
    buttons: {
        allExcercises: { he: "לכל התרגילים", en: "All Exercises" },
        sendFeedback: { he: "שלחו פידבק", en: "Send Feedback" },
        eran: { he: "מוקדי סיוע", en: "Eran" },
        contacts: { he: "אנשי קשר", en: "Contacts" },

    }

}

export const feedback = {
    header: {
        en: "We are here for you.",
        he: "אנחנו פה בשבילכם.",
        ar: "TODO",
    },
    body: {
        en: "We are curious to hear about your app usage experience.",
        he: "נשמח לשמוע על החוויה שלכם באפליקציה",
        ar: "TODO",
    },
    buttons: {
        textInput: {
            he: 'כתבו לנו...',
            en: 'Write to us...'
        },
        send: {
            he: 'שלחו פידבק',
            en: 'Send Feedback',
        }
    }
}

export const thanks = {
    header: {
        he: "אנחנו פה בשבילכם.\nאתם לא לבד!",
    },
    body: {
        he: "מעריכים מאוד את הפידבק!",
    },
}


// Question Screens

export const locationSelect = {
    header: {
        en: "Where are you right now?",
        he: "איפה אתם נמצאים כרגע?",
        ar: "أين أنت في هذه اللحظة",
    },
    buttons: {
        public: {
            en: "Public place",
            he: "מקום ציבורי",
            ar: "مكان عام",
        },
        home: {
            en: "Home",
            he: "בית",
            ar: "المنزل"
        },
        alone: {
            en: "Isolated without resources",
            he: "לבד בלי אמצעים",
            ar: "مكان منعزل من دون مساعدة (أو موارد)",
        }
    }
}

export const checkup = {
    header: {
        en: "How are you feeling right now?",
        he: "איך אתם מרגישים כרגע?",
        ar: "كيف تشعرون الآن؟",
    },
    buttons: {
        better: {
            en: "I'm better",
            he: "יותר טוב",
            ar: "أفضل"
        },
        same: {
            en: "The same",
            he: "אותו דבר",
            ar: "نفس الشيئ"
        },
        worse: {
            en: "It's getting worse",
            he: "זה מחמיר",
            ar: "الوضع يزداد سوء",
        },
    }
}

export const feelingBetter = {
    header: {
        en: "Glad to hear you're feelling better, What's your next step?",
        he: "אני שמח שיש שיפור, מה תרצו שנעשה כרגע?",
        ar: "سعيد لسماع أنكم تشعرون بتحسن. ما هي خطوتكم التالية؟",
    },
    buttons: {
        more: {
            en: "I need further assistance",
            he: "נמשיך לתרגילים אחרים",
            ar: "أحتاج إلى المزيد من المساعدة",
        },
        repeat: {
            en: "Repeat this tool",
            he: "נמשיך באותו תרגיל",
            ar: "تكرير هذه الأداة",
        },
        finish: {
            en: "I'm calm right now",
            he: "לסיים את השימוש",
            ar: "أنا هادئ الآن",
        }
    }
}

export const feelingWorse = {
    header: {
        en: "We're in this together. What's your next step?",
        he: "אני פה איתכם, מה יעזור לכם כרגע?",
        ar: "نحن في هذا معًا.  ما هي خطوتكم التالية؟",
    },
    buttons: {
        more: {
            en: "Different tool",
            he: "תרגילים נוספים",
            ar: "أداة مختلفة",
        },
        repeat: {
            en: "Repeat this tool",
            he: "להישאר בתרגיל הנוכחי",
            ar: "تكرير هذه الأداة",
        }
    }
}

// Exercise select screens

export const groundingSelect = {
    header: {
        en: "Choose one of these grounding techniques",
        he: "בחרו אחת מתרגילי הקרקוע הבאים",
        ar: "جربوا إحدى تقنيات التأريض هذه",
    },
    buttons: {
        stretch: {
            en: "Stretch",
            he: "מתיחות",
        },
        smell: {
            en: "Smell",
            he: "ריח",
        },
        ice: {
            en: "Ice",
            he: "קור",
        },
    }
}

export const mentalSelect = {
    header: {
        en: "Try one of these mental grounding techniques",
        he: "נסו אחד מהתרגילים הבאים",
        ar: "جربوا إحدى تقنيات التأريض الذهني هذه",
    },
    buttons: {
        sing: {
            en: "Hum",
            he: "זמזום",
        },
        count: {
            en: "Count",
            he: "ספירה",
        },
        color: {
            en: "Color",
            he: "צבעים",
        },
        words: {
            en: "Words",
            he: "מילים",
        },
    }
};


// Exercise Screens

export const standardExercises = {
    // Grounding
    stretch: {
        en: "Stretch or jump in place",
        he: "עשו מתיחות, שפשפו את הידיים או קפצו במקום",
        ar: "مدّدوا عضلاتكم أو اقفزوا في مكانكم",
    },
    smell: {
        en: "Smell Something with a Strong Scent",
        he: "הריחו משהו בעל ריח חזק",
        ar: "شمّوا شيء رائحته قوية",
    },
    ice: {
        en: "Wash your Face with cold water or hold an ice cube",
        he: "תשטפו את הפנים עם מים קרים או החזיקו קוביית קרח",
        ar: "أغسلوا وجهكم بالماء البارد أو أمسكوا مكعب ثلج",
    },
    // Mental Grounding
    count: {
        en: "Count even numbers from 0 to 100",
        he: "ספרו לאחור מ-100 עד 0, אבל רק מספרים זוגיים",
        ar: "عدّوا الأعداد الزوجية من 0 إلى 100",
    },
    sing: {
        en: "Recite, hum or sing a song you like",
        he: "שירו או זמזמו שיר אהוב עליכם",
        ar: "قوموا بقراءة أو همهمة أو غناء أغنية تحبوها",
    },
    color: {
        he: "הסתכלו סביבכם וחפשו 5 דברים בצבע לבן",
        en: "Look around you, try to find 5 object with a white color",
    },
    words: {
        he: "חשבו על 10 מילים שמתחילות באות א'",
        en: "Think of 10 words that start with the letter A",
    },
    drink: {
        en: "Drink a Cup of Water",
        he: "שתו כוס מים",
        ar: "إشربوا كأس ماء",
    },
    shower: {
        en: "Take a shower or wash your face",
        he: "לכו להתקלח או שטפו את הפנים במים קרים",
        ar: "إستحِموا",
    }
}

export const breathing = {
    intro: {
        en: "My name is Tal,\n I will be with you until you calm down.\n"
            + "\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b" // 19 zero-width spaces for delay
            + "Let's start breathing deeply for 30 seconds.",
        he: "אני טל ואני אהיה אתכם עד שתירגעו.\n"
            + "\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b" // 19 zero-width spaces for delay
            + " בואו נתחיל בלנשום עמוק למשך 30 שניות.",
        ar: "دعونا نبدأ بالتنفس لثلاثين (30) ثانية.بإمكانك فعل ذلك!",
    },

    inhale: {
        instructions: { he: "שאפו במשך", en: "Exhale for" },
        seconds: { he: "4 שניות", en: "4 Seconds" },
    },
    exhale: {
        instructions: { he: "נשפו במשך", en: "Inhale for" },
        seconds: { he: "6 שניות", en: "6 Seconds" },
    }
}

export const muscleRelaxation = {
    intro: {
        he: "שלום, קודם כל אני רוצה שתדעו שאתם לא לבד. \n\nועכשיו – בואו נתרגל טכניקה שנקראת 'הרפיית שרירים מתקדמת' או PMR. \n\nמצאו תנוחת ישיבה נוחה ונשמו נשימה עמוקה. ",
        en: "Hello, first of all I want you to know that \nyou're not alone.\nLet's try a technique called Progressive Muscle Relaxation or PMR\nFirst, find a comfortable seated position and take a deep breath in."
    },

    partA: { // text options for first paragraph, for each phase
        hands: {
            he: "עכשיו אגרפו את כפות הידיים, הדקו אותן חזק, ולאחר שניות אחדות שחררו את האגרופים תוך כדי נשיפה. ",
            en: "Now, I want you to tighten the muscles in your hands into fists. Hold this tension for a few seconds, and then release the tension as you exhale.",
        },
        head: {
            he: "עכשיו בואו נתמקד בשרירי הפנים שלכם. \n כווצו את שרירי המצח, ולאחר שניות אחדות הרפו אותם תוך כדי נשיפה. הרפו גם את הלחיים ואת הלסת. ",
            en: "Next, let's focus on the muscles in your face.\nScrunch up your forehead and hold it for a few seconds, and then release as you exhale.",
        },
        shoulders: {
            he: "עכשיו נעבור לכתפיים. \n העלו אותן לכיוון האוזניים והישארו במצב הזה שניות אחדות, ואז שחררו את המתח תוך כדי נשיפה.",
            en: "Now, let's move to your shoulders.\n Bring them up towards your ears and hold for a few seconds, and then release the tension as you exhale.",
        },
        arms: {
            he: "נעבור לזרועות. \n הדקו את שרירי הזרועות על ידי כיפוף הידיים. הישארו כך שניות אחדות, ואז שחררו תוך כדי נשיפה והניחו לזרועות להירגע משני צידי הגוף. ",
            en: "Let's move down to your arms.\n Tighten your biceps by flexing your arms and hold for a few seconds, and then release as you exhale",
        },
        legs: {
            he: "עכשיו נרפה את הרגליים. \n הדקו את שרירי הירכיים על ידי הצמדת הברכיים זו לזו והישארו במצב הזה שניות אחדות. שחררו את המתח תוך כדי נשיפה. ",
            en: "Finally, let's focus on your legs.\n Tighten your thigh muscles by pressing your knees together and hold for a few seconds, and then release as you exhale.",
        },
        fullBody: {
            he: "התמקדו בנשימה שלכם והרגישו את ההרפיה מתפשטת בגופכם. ",
            en: "Take a moment to focus on your breath and feel the relaxation spreading through your body.\nRemember, you're not alone. ",
        },
    },
    partB: {
        // Text options for second paragraph, for each phase
        hands: {
            he: "\nהרגישו את המתח מתפוגג. ",
            en: " Feel the tension melt away."
        },
        head: {
            he: "",
            en: " Let your cheeks and jaw relax.",
        },
        shoulders: {
            he: "אפשרו למתח לזרום החוצה מגופכם.  ",
            en: "Let the tension flow out of your body.",
        },
        arms: {
            he: "",
            en: " Let your arms relax at your sides.",
        },
        legs: {
            he: "הרגישו את השרירים שלכם נרגעים לחלוטין. ",
            en: "Feel your muscles relax completely.",
        },
        fullBody: {
            he: "\nזכרו, אתם לא לבד.",
            en: "You've got this.",
        },
    }

}

