﻿Globalize.addCultureInfo("bg", "default", {
        name: "bg",
        englishName: "Bulgarian",
        nativeName: "Български",
        language: "bg",
        numberFormat: {
            ",": " ",
            ".": ",",
            negativeInfinity: "- Безкрайност",
            positiveInfinity: "+ Безкрайност",
            percent: {
                ",": " ",
                ".": ","
            },
            currency: {
                pattern: ["-n $", "n $"],
                ",": " ",
                ".": ",",
                symbol: "лв."
            }
        },
        calendars: {
            standard: {
                "/": ".",
                firstDay: 1,
                days: {
                    names: ["Понеделник", "Вторник", "Сряда", "Четвъвтък", "Петък", "Събота", "Неделя"],
                    namesAbbr: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
                    namesShort: ["П", "В", "С", "Ч", "П", "С", "Н"]
                },
                months: {
                    names: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември", ""],
                    namesAbbr: ["Яну", "Феб", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек", ""]
                },
                AM: null,
                PM: null,
                eras: [{ "name": "???? ?????? ???", "start": null, "offset": 0}],
                patterns: {
                    d: "dd.MM.yyyy 'г.'",
                    D: "dd MMMM yyyy 'г.'",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy 'г.' HH:mm",
                    F: "dd MMMM yyyy 'г.' HH:mm:ss",
                    M: "dd MMMM",
					n: "dd.MM.yyyy hh:mm",
					//  long date-time numbers only
					N: "dd.MM.yyyy hh:mm:ss",
                    Y: "MMMM yyyy 'г.'",
					// f + weekday
					w: "dddd, dd MMMM yyyy hh:mm",
					// F + weekday
					W: "dddd, dd MMMM yyyy hh:mm:ss"
					
                }
            }
        }
    });