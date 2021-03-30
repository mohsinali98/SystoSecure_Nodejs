const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const { Announcement } = require("../models/announcement");
const { Exam } = require("../models/exam");
const { Result } = require("../models/result");
const { TimeTable } = require("../models/timetable");
const express = require("express");
const multer = require('multer');
const sharp = require('sharp');
const moment = require('moment');

const router = express.Router();

router.get("/me", [auth, admin], async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

const upload = multer({
    fileFilter(req, file, cb) {
        if (!(file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') || file.originalname.endsWith('.png'))) {
            return cb(new Error('Please upload an image...'));
        }
        cb(undefined, true);
    }
});

router.post("/", upload.single('profileImg'), async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already registered.");

    const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200, fit: sharp.fit.inside }).jpeg().toBuffer();
    req.body.profileImg = buffer;

    user = new User({
        "name": req.body.name,
        "username": req.body.username,
        "password": req.body.password,
        "profileImg": req.body.profileImg,
        "isAdmin": req.body.isAdmin
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    user1 = new User(_.pick(user, ["_id", "name", "username", "isAdmin"]));

    const token = user1.generateAuthToken();
    res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(user1);
});

router.post('/announcement', [auth, admin], async (req, res) => {
    const announce = new Announcement({
        "date": moment().format('l'),
        "announceText": req.body.announceText
    });

    await announce.save();
    res.send(_.pick(announce, ["date", "announceText"]));
})

router.delete('/announcement/:id', [auth, admin], async (req, res) => {
    const delAnn = await Announcement.findByIdAndRemove(req.params.id);
    if (!delAnn)
        return res.status(404).send("The announcement with the given ID was not found.");

    res.send(delAnn);
})

router.post('/exam', [auth, admin], async (req, res) => {
    const exam = new Exam({
        "date": moment().format('l'),
        "exam": req.body.exam
    });

    await exam.save();
    res.send(_.pick(exam, ["date", "exam"]));
})

router.delete('/exam/:id', [auth, admin], async (req, res) => {
    const delExam = await Exam.findByIdAndRemove(req.params.id);
    if (!delExam)
        return res.status(404).send("The exam with the given ID was not found.");

    res.send(delExam);
})

router.get('/students', [auth, admin], async (req, res) => {
    const allStudents = await User.find({ isAdmin: false });
    res.send(allStudents);

})


router.post('/result', [auth, admin], async (req, res) => {
    let result = await Result.findOne({ username: req.body.username });
    if (result) {
        await Result.deleteOne({ username: result.username });
    }
    result = new Result(_.pick(req.body, ["username", "english", "urdu", "maths", "chemistry", "physics", "total", "obtained"]));
    await result.save();
    res.send(_.pick(result, ["username", "english", "urdu", "maths", "chemistry", "physics", "total", "obtained"]));
});

router.post('/timetable', [auth, admin], async (req, res) => {
    await TimeTable.deleteMany({});

    const timetable = new TimeTable({
        "monday": req.body.monday,
        "tuesday": req.body.tuesday,
        "wednesday": req.body.wednesday,
        "thursday": req.body.thursday,
        "friday": req.body.friday
    });

    await timetable.save();
    res.send(_.pick(timetable, ["monday", "tuesday", "wednesday", "thursday", "friday"]));
})
module.exports = router;