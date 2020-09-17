INSERT INTO journals (entry, date, createdAt, updatedAt, UserId) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '9/13/2020', curDate(), curDate(), 1);
INSERT INTO journals (entry, date, createdAt, updatedAt, UserId) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '9/14/2020', curDate(), curDate(), 1);
INSERT INTO journals (entry, date, createdAt, updatedAt, UserId) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '9/15/2020', curDate(), curDate(), 1);

INSERT INTO gratefuls (journalID, one, two, three, four, five, createdAt, updatedAt) VALUES (2, 'My spouse', 'Atlas', 'Good Health'," "," ",curDate(), curDate());
INSERT INTO gratefuls (journalID, one, two, three, four, five, createdAt, updatedAt) VALUES (3, 'Understanding', 'Friends', 'Mind', 'Books', 'Weekend',curDate(), curDate());
INSERT INTO gratefuls (journalID, one, two, three, four, five, createdAt, updatedAt) VALUES (4, 'Mistakes', 'Having a Voice', 'Laughter', 'Communication', 'Learning',curDate(), curDate());

INSERT INTO remembers (journalID, one, two, three, four, five, createdAt, updatedAt) VALUES (2, 'Do stuff', 'Do things', 'Remember'," "," ",curDate(), curDate());
INSERT INTO remembers (journalID, one, two, three, four, five, createdAt, updatedAt) VALUES (3, 'Groceries', 'Call Mom', 'Renew License', 'Read', 'Homework',curDate(), curDate());
INSERT INTO remembers (journalID, one, two, three, four, five, createdAt, updatedAt) VALUES (4, 'Live', 'Laugh', 'Love', 'Set Boundaries', 'Breathe',curDate(), curDate());

INSERT INTO moods (journalID, mood, medication, hoursSleep, minutesExercise, minutesNapping, servingsCaffiene, servingsAlcohol, hoursTV, showered, brushedTeeth, selfCare, minutesSocial, headache, nausea, exhaustion, insomnia, appetite, menstruation, createdAt, updatedAt) VALUES (2, 2, false, 6, 55, 54, 3, 3, 2, true, true, true, 24, true, true, true, true, 3, true, curDate(), curDate());
INSERT INTO moods (journalID, mood, medication, hoursSleep, minutesExercise, minutesNapping, servingsCaffiene, servingsAlcohol, hoursTV, showered, brushedTeeth, selfCare, minutesSocial, headache, nausea, exhaustion, insomnia, appetite, menstruation, createdAt, updatedAt) VALUES (3, 2, false, 6, 55, 54, 3, 3, 2, true, true, true, 24, true, true, true, true, 3, true, curDate(), curDate());
INSERT INTO moods (journalID, mood, medication, hoursSleep, minutesExercise, minutesNapping, servingsCaffiene, servingsAlcohol, hoursTV, showered, brushedTeeth, selfCare, minutesSocial, headache, nausea, exhaustion, insomnia, appetite, menstruation, createdAt, updatedAt) VALUES (4, 2, false, 6, 55, 54, 3, 3, 2, true, true, true, 24, true, true, true, true, 3, true, curDate(), curDate());