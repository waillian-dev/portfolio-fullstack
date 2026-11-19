import React, { useEffect, useState } from 'react';
import {
  fetchContactMessages,
  updateContactStatus,
  deleteContactMessageApi,
} from '../../services/api';
import { IContactMessage } from '../../types';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Trash2, Calendar } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const data = await fetchContactMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleReadStatus = async (id: string, currentRead: boolean) => {
    try {
      await updateContactStatus(id, { isRead: !currentRead });
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete message?')) return;
    try {
      await deleteContactMessageApi(id);
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Contact Messages</h2>
        <p className="text-xs text-muted-foreground">Inbound inquiries submitted from portfolio contact form</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground text-sm">
            No contact messages received yet.
          </Card>
        ) : (
          messages.map((msg) => (
            <Card
              key={msg._id}
              className={`p-5 space-y-3 border-l-4 ${
                msg.isRead ? 'border-l-border bg-card' : 'border-l-primary bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-foreground">{msg.name}</h3>
                  <span className="text-xs text-muted-foreground">{msg.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(msg.createdAt)}
                  </span>
                  <button
                    onClick={() => toggleReadStatus(msg._id, msg.isRead)}
                    className="p-1.5 rounded hover:bg-muted text-xs font-semibold text-primary"
                  >
                    {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-xs font-bold text-foreground">{msg.subject}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{msg.message}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
