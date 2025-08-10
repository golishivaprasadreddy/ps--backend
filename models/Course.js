import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  isProgram: { type: Boolean, default: false },
  topics: [
    {
      title: { type: String, required: true },
      type: { type: String, enum: ['video', 'text'], required: true },
      // For 'video', use contentUrl; for 'text', use content
      contentUrl: { type: String, default: '' },
      content: { type: String, default: '' },
      // Rich metadata
      summary: { type: String, default: '' },
      objectives: [{ type: String }],
      estimatedMinutes: { type: Number, default: 5 },
      imageUrl: { type: String, default: '' },
      codeSnippet: { type: String, default: '' },
      resources: [
        {
          label: { type: String, default: '' },
          url: { type: String, default: '' },
        },
      ],
      tips: [{ type: String }],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Course', courseSchema);
