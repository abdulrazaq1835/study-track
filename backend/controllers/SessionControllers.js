import StudySession from "../models/StudySession.js";

export const startSession = async (req, res) => {
  try {
    const { date, day, subject, topic, description } = req.body;

    if (!date || !day || !subject || !topic) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const newSession = await StudySession.create({
      date,
      day,
      subject,
      topic,
      description: description || "",
      startTime: new Date(),
      status: "in_progress",
      totalPausedTime: 0,
    });

    res.status(201).json({
      message: "session Created Successfully",
      data: newSession,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const pauseSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await StudySession.findById(id);

    if (!session) {
      return res.status(404).json({ message: "session not found" });
    }

    if (session.status !== "in_progress") {
      return res.status(400).json({ message: "session not in progress" });
    }

    session.status = "paused";
    session.pausedAt = new Date();
    await session.save();

    res.status(200).json({ message: "session Paused Successfully", data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resumeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await StudySession.findById(id);

    if (!session) {
      return res.status(404).json({ message: "session not found" });
    }

    if (session.status !== "paused") {
      return res.status(400).json({ message: "session not paused" });
    }

    const currentTime = new Date();
    const pausedDuration = currentTime - session.pausedAt;

    session.totalPausedTime += pausedDuration;
    session.status = "in_progress";
    session.pausedAt = null;

    await session.save();

    res.status(200).json({ message: "session Resumed Successfully", data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const stopSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await StudySession.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Session Not Found" });
    }

    session.endTime = new Date();
    session.status = "completed";

    const totalTime = session.endTime - session.startTime;
    session.totalDuration = Math.round(totalTime - session.totalPausedTime);

    await session.save();

    res.status(200).json({ message: "Session Completed", data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSession = async (req, res) => {
  try {
    const sessions = await StudySession.find().sort({ createdAt: -1 });
    res.status(200).json({ data: sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await StudySession.findById(id);

    if (!session) {
      return res.status(404).json({ message: "Single Session Not Found" });
    }

    res.status(200).json({ data: session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, description } = req.body;

    const session = await StudySession.findById(id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found!",
      });
    }

    if (topic) session.topic = topic;
    if (description !== undefined) session.description = description;

    await session.save();

    res.status(200).json({
      success: true,
      message: "Session updated successfully!",
      data: session,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await StudySession.findByIdAndDelete(id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Session deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
