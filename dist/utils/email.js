"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const errorHandler_1 = __importDefault(require("./errorHandler"));
class EmailSender {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    sendEmail(toAddress, subject, text, html) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USERNAME,
                    to: toAddress,
                    subject: subject,
                    text: text,
                    html: html,
                };
                yield this.transporter.sendMail(mailOptions);
                console.log('Email sent to:', toAddress);
            }
            catch (error) {
                throw new errorHandler_1.default('Failed to send email', 500);
            }
        });
    }
    sendWelcomeEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Template rendering logic
        });
    }
    sendPasswordResetEmail(user, resetToken, url) {
        return __awaiter(this, void 0, void 0, function* () {
            // Template rendering logic
        });
    }
}
exports.default = EmailSender;
//# sourceMappingURL=email.js.map