import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { IProfile, ISiteSetting } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { sendContactMessage } from '../services/api';

export const Contact: React.FC<{ profile?: IProfile; settings?: ISiteSetting }> = ({
  profile,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await sendContactMessage(formData);
      setStatus('success');
      setFeedback(res.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Get In Touch</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Let's Build Something Great Together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have a project in mind or interested in collaborating? Feel free to reach out using the form or direct channels below.
            </p>

            <div className="space-y-4 pt-4">
              <Card className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Email</p>
                  <a
                    href={`mailto:${profile?.email || 'alex.vance@example.com'}`}
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {profile?.email || 'alex.vance@example.com'}
                  </a>
                </div>
              </Card>

              {profile?.phone && (
                <Card className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Phone</p>
                    <span className="text-sm font-bold text-foreground">{profile.phone}</span>
                  </div>
                </Card>
              )}

              <Card className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Location</p>
                  <span className="text-sm font-bold text-foreground">
                    {profile?.location || 'San Francisco, CA'}
                  </span>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                {status === 'success' && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /> {feedback}
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {feedback}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  className="w-full gap-2 justify-center"
                >
                  {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
