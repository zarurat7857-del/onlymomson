"use client";
import { useState } from "react";
import { Mail, Send, Copy, Check, Zap, Crown, Sparkles, Briefcase, X, QrCode, AlertTriangle } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import AdSlot from "@/components/common/AdSlot";
import Image from "next/image";

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState<'general' | 'personal'>('general');
    const [showQr, setShowQr] = useState(false);
    const [formStatus, setFormStatus] = useState("idle"); 
    const [txId, setTxId] = useState("");
    
    // FORM STATE
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Feedback",
        message: ""
    });

    const [copied, setCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const EMAIL = "zarurat7856@gmail.com";
    const UPI_ID = "constructc999@gmail.com"; 
    const UPI_LINK = `upi://pay?pa=${UPI_ID}&pn=OnlyMomsOn&cu=INR`;
    const QR_API = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(UPI_LINK)}`;

    const handleCopy = (text: string, type: 'upi' | 'email') => {
        navigator.clipboard.writeText(text);
        if (type === 'upi') {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        }
    };

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // LOGIC: Personal Tab requires TxID to be enabled
    const canSendPersonal = activeTab === 'general' || (activeTab === 'personal' && txId.trim().length > 0);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("sending");

        // Simulate processing then show Dev Message
        setTimeout(() => {
            setFormStatus("dev_notice"); 
            // We do NOT clear the form so user can copy their message
            setTimeout(() => setFormStatus("idle"), 10000); // Show for 10 seconds
        }, 1000);
    };

    return (
        <div className="min-h-screen pb-24 bg-[#050505]">
            <MobileMenu />

            {/* QR CODE POPUP */}
            {showQr && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setShowQr(false)}>
                    <div className="bg-white p-6 rounded-2xl text-center relative max-w-sm w-full" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowQr(false)} className="absolute top-2 right-2 text-black hover:text-red-500"><X /></button>
                        <h3 className="text-black font-bold text-lg mb-4">Scan to Pay</h3>
                        <div className="flex justify-center mb-4">
                            <Image src={QR_API} width={200} height={200} alt="UPI QR" unoptimized />
                        </div>
                        <p className="text-black font-mono font-bold bg-gray-100 p-2 rounded">{UPI_ID}</p>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white mb-2">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Touch</span>
                    </h1>
                    <p className="text-gray-400 text-sm">Select your channel below</p>
                </div>

                {/* TAB SWITCHER */}
                <div className="flex p-1 bg-white/5 border border-white/10 rounded-full mb-8 max-w-lg mx-auto relative">
                    <button 
                        onClick={() => setActiveTab('general')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                            activeTab === 'general' 
                            ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Briefcase size={14} /> General & Business
                    </button>
                    <button 
                        onClick={() => setActiveTab('personal')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                            activeTab === 'personal' 
                            ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-black shadow-lg' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Crown size={14} /> Personal (Paid)
                    </button>
                </div>

                <div className="grid md:grid-cols-5 gap-8">
                    
                    {/* LEFT COLUMN: EXPLANATION & PAYMENT */}
                    <div className="md:col-span-2 space-y-6">
                        <div className={`p-6 rounded-2xl border transition-colors duration-500 ${
                            activeTab === 'personal' ? 'bg-yellow-900/10 border-yellow-500/30' : 'bg-[#111] border-white/10'
                        }`}>
                            
                            {/* HEADER */}
                            <h3 className={`font-bold mb-3 flex items-center gap-2 ${
                                activeTab === 'personal' ? 'text-yellow-400' : 'text-white'
                            }`}>
                                {activeTab === 'personal' ? <Sparkles size={18} /> : <Mail size={18} />}
                                {activeTab === 'personal' ? 'Exclusive & Paid' : 'General Inquiries'}
                            </h3>
                            
                            {/* --- EXPLANATION TEXT --- */}
                            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                {activeTab === 'general' 
                                    ? (
                                        <>
                                            This channel is for <strong>General Queries</strong>, <strong>Business Collaborations</strong>, and <strong>Fan Mail</strong>. 
                                            We curate this section professionally to handle feedback, bug reports, and partnership opportunities.
                                        </>
                                    )
                                    : (
                                        <>
                                            This channel is strictly for <strong>Personal Use</strong>. You cannot send a message here without a payment (TxID required). 
                                            Use this to request <strong>Custom Content personal for yourself</strong>, specific fantasies, or to simply show support & love.
                                        </>
                                    )
                                }
                            </p>

                            {/* Payment / Contact Details */}
                            <div className="space-y-3">
                                <div className="bg-black/50 border border-white/10 p-3 rounded-xl flex items-center justify-between group">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Business Email</p>
                                        <p className="text-white text-xs truncate max-w-[150px]">{EMAIL}</p>
                                    </div>
                                    <button onClick={() => handleCopy(EMAIL, 'email')} className="text-gray-400 hover:text-white">
                                        {emailCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                </div>

                                <div className={`bg-black/50 border p-3 rounded-xl flex items-center justify-between ${
                                    activeTab === 'personal' ? 'border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-brand-pink/30'
                                }`}>
                                    <div>
                                        <p className={`text-[10px] uppercase tracking-wider font-bold ${
                                            activeTab === 'personal' ? 'text-yellow-500' : 'text-brand-pink'
                                        }`}>
                                            {activeTab === 'personal' ? 'UPI (Required)' : 'UPI (Donate)'}
                                        </p>
                                        <p className="text-white text-sm font-mono">{UPI_ID}</p>
                                    </div>
                                    <button onClick={() => handleCopy(UPI_ID, 'upi')} className={
                                        activeTab === 'personal' ? 'text-yellow-500' : 'text-brand-pink'
                                    }>
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                
                                {/* Mobile UPI Button */}
                                <a 
                                    href={UPI_LINK} 
                                    className="md:hidden flex items-center justify-center gap-2 bg-white/10 border border-white/20 p-2 rounded-lg text-xs font-bold text-white hover:bg-white/20 transition-colors"
                                >
                                    <Zap size={14} /> Open UPI App
                                </a>
                                
                                {/* Desktop QR Button */}
                                <button 
                                    onClick={() => setShowQr(true)} 
                                    className="hidden md:flex w-full items-center justify-center gap-2 bg-white/10 border border-white/20 p-2 rounded-lg text-xs font-bold text-white hover:bg-white/20 transition-colors"
                                >
                                    <QrCode size={14} /> Show QR Code
                                </button>
                            </div>
                        </div>
                        <AdSlot id="CONTACT-SIDEBAR" type="banner" />
                    </div>

                    {/* RIGHT COLUMN: The Form */}
                    <div className="md:col-span-3 bg-[#111] border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                        
                        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] -z-10 transition-colors duration-500 ${
                            activeTab === 'personal' ? 'bg-yellow-600/10' : 'bg-brand-pink/10'
                        }`} />

                        <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                                    <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors" placeholder="Name / Org" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Email</label>
                                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors" placeholder="For reply..." />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Topic</label>
                                    <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none">
                                        {activeTab === 'general' ? (
                                            <>
                                                <option>General Feedback</option>
                                                <option>Business Collaboration</option>
                                                <option>Fan Mail</option>
                                                <option>Report a Bug</option>
                                            </>
                                        ) : (
                                            <>
                                                <option>Custom Content Request</option>
                                                <option>Specific Fantasy / RP</option>
                                                <option>Support / Love (Donation)</option>
                                                <option>Priority Feature Request</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                                        activeTab === 'personal' ? 'text-yellow-500' : 'text-gray-500'
                                    }`}>
                                        TxID {activeTab === 'personal' ? '*' : '(Optional)'}
                                    </label>
                                    <input 
                                        type="text" 
                                        value={txId}
                                        onChange={(e) => setTxId(e.target.value)}
                                        className={`w-full bg-black/50 border rounded-lg p-3 text-white text-sm focus:outline-none transition-colors ${
                                            activeTab === 'personal' ? 'border-yellow-500/30 focus:border-yellow-500' : 'border-white/10 focus:border-white/30'
                                        }`}
                                        placeholder={activeTab === 'personal' ? "Required" : "Optional"} 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                <textarea 
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={5} 
                                    className={`w-full bg-black/50 border rounded-lg p-3 text-white text-sm focus:outline-none transition-colors resize-none ${
                                        activeTab === 'personal' ? 'border-yellow-500/20 focus:border-yellow-500' : 'border-white/10 focus:border-brand-pink'
                                    }`}
                                    placeholder={activeTab === 'general' 
                                        ? "How can we collaborate? / Tell us what you think..." 
                                        : "Describe your request in detail. Please confirm amount sent."
                                    }
                                ></textarea>
                            </div>

                            {/* --- THE CURATED UNDER DEV MESSAGE --- */}
                            {formStatus === 'dev_notice' && (
                                <div className="bg-yellow-900/30 text-yellow-200 p-4 rounded-xl text-sm text-center border border-yellow-500/30 animate-in fade-in flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2 font-bold text-yellow-400">
                                        <AlertTriangle size={18} /> 
                                        System Under Maintenance
                                    </div>
                                    <p>
                                        The form is currently being updated. To ensure we see your message, please 
                                        <strong> send it directly via Email or UPI</strong> using the details provided on the left.
                                    </p>
                                </div>
                            )}

                            <button 
                                disabled={!canSendPersonal || formStatus === 'sending'}
                                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                    canSendPersonal 
                                        ? activeTab === 'personal' 
                                            ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-black hover:scale-[1.02] shadow-yellow-900/20' 
                                            : 'bg-gradient-to-r from-brand-purple to-brand-pink text-white hover:scale-[1.02] shadow-brand-pink/20'
                                        : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5'
                                }`}
                            >
                                {formStatus === 'sending' ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <Send size={18} /> 
                                        {activeTab === 'personal' ? 'Verify & Send Request' : 'Send Message'}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}