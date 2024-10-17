const Joi = require('joi');

// ... (keep existing schemas and exports)

const sendMessageSchema = Joi.object({
  content: Joi.string().allow(''),
  media: Joi.object({
    type: Joi.string().valid('photo', 'video').required(),
    file: Joi.binary().required()
  }).optional()
}).or('content', 'media');

const editMessageSchema = Joi.object({
  content: Joi.string().required()
});

const mediaConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageFormats: ['image/jpeg', 'image/png', 'image/gif'],
  allowedVideoFormats: ['video/mp4', 'video/quicktime'],
  maxVideoDuration: 10 // seconds
};

exports.validateSendMessage = (req, res, next) => {
  const { error } = sendMessageSchema.validate(req.body);
  if (error) return res.status(400).json({ status: 'fail', message: error.details[0].message });

  if (req.body.media) {
    const { type, file } = req.body.media;
    
    // Check file size
    if (file.size > mediaConfig.maxFileSize) {
      return res.status(400).json({ status: 'fail', message: 'File size exceeds the maximum limit of 10MB' });
    }

    // Check file format
    if (type === 'photo' && !mediaConfig.allowedImageFormats.includes(file.mimetype)) {
      return res.status(400).json({ status: 'fail', message: 'Invalid image format. Allowed formats are JPEG, PNG, and GIF' });
    }

    if (type === 'video' && !mediaConfig.allowedVideoFormats.includes(file.mimetype)) {
      return res.status(400).json({ status: 'fail', message: 'Invalid video format. Allowed formats are MP4 and QuickTime' });
    }

    // For videos, check duration (this would typically be done server-side after upload)
    if (type === 'video') {
      // Note: Actual video duration check would be implemented in the controller
      req.videoCheck = true;
    }
  }

  next();
};

// ... (keep other existing exports)