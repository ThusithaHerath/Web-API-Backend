exports.DocumentSchema = function (mongoose) {
    const documentSchema = new mongoose.Schema({
        documentTitle: String,
        extension: String,
        expire: Number,
        email: String,
        isSend: {
            type: Boolean,
            default: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "document",
        },
    });
    return mongoose.model('document', documentSchema);
}
