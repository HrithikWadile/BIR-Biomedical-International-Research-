
import React, { useState } from 'react';
import { 
  Settings, 
  LayoutGrid, 
  MessageSquare, 
  Save, 
  Trash2, 
  Plus, 
  LogOut, 
  BookOpenCheck,
  FilePlus,
  Beaker,
  ExternalLink,
  X,
  RefreshCcw,
  ShieldAlert
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { CMSData, SiteSettings, UpcomingPaper, CaseStudy } from '../types';
import { BIRLogo } from '../components/Logo';

export const Admin: React.FC = () => {
  const [data, setData] = useState<CMSData>(dataService.getData());
  const [activeTab, setActiveTab] = useState<'settings' | 'projects' | 'publications' | 'submissions' | 'enrollments'>('settings');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  // Read admin password from a Vite build-time env var.
  // Local dev: set VITE_ADMIN_PASSWORD in .env.local
  // Cloudflare Pages: set VITE_ADMIN_PASSWORD as a Production environment variable and redeploy
  const ADMIN_PASSWORD = (import.meta as any).env?.VITE_ADMIN_PASSWORD as string | undefined;
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ADMIN_PASSWORD) {
      alert('Admin password is not configured for this deployment.');
      return;
    }
    // In a real production app, this would be a secure API call to a server-side auth service.
    if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid security credential. Access denied.');
    }
  };

  const refreshData = () => setData(dataService.getData());

  const handleResetData = () => {
    if (window.confirm('This will restore all default site content and fix broken image links. Any unsaved custom changes will be lost. Proceed?')) {
      dataService.resetData();
      refreshData();
      alert('System data restored successfully.');
    }
  };

  const saveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedSettings: SiteSettings = {
      ...data.settings,
      companyName: formData.get('companyName') as string,
      tagline: formData.get('tagline') as string,
      heroText: formData.get('heroText') as string,
      contactEmail: formData.get('contactEmail') as string,
    };
    dataService.updateSettings(updatedSettings);
    refreshData();
    alert('Settings committed to local buffer!');
  };

  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const project: UpcomingPaper = {
      id: editingItem?.id || `up-${Math.random().toString(36).substr(2, 5)}`,
      title: formData.get('title') as string,
      domain: formData.get('domain') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as any,
      requiredBackground: formData.get('requiredBackground') as string,
      spots: parseInt(formData.get('spots') as string) || 0,
    };
    dataService.updateCollection('upcomingPapers', project);
    setEditingItem(null);
    refreshData();
  };

  const handleSavePublication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pub: CaseStudy = {
      id: editingItem?.id || `pub-${Math.random().toString(36).substr(2, 5)}`,
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1532187863486-abf9bdad1b4c?auto=format&fit=crop&q=80&w=1000',
      problem: formData.get('problem') as string,
      solution: formData.get('solution') as string,
      outcome: formData.get('outcome') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
      link: formData.get('link') as string,
    };
    dataService.updateCollection('caseStudies', pub);
    setEditingItem(null);
    refreshData();
  };

  const deleteItem = (collection: keyof CMSData, id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dataService.deleteItem(collection, id);
      refreshData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f365d] px-6">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20">
          <div className="flex justify-center mb-10">
            <BIRLogo className="h-12" />
          </div>
          <h2 className="text-2xl font-black text-center mb-10 text-[#0f365d] uppercase tracking-widest">Executive Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Master Credential</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-[#0f365d] text-white font-black py-5 rounded-xl hover:bg-[#1a4a7a] transition-all shadow-xl uppercase tracking-[0.2em]">
              Verify Identity
            </button>
            {!ADMIN_PASSWORD && (
              <p className="text-[10px] text-center text-amber-200 font-bold uppercase tracking-widest">
                Admin password not configured. Set VITE_ADMIN_PASSWORD in Cloudflare Pages (Production env vars) and redeploy.
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#0f365d] text-slate-300 flex flex-col pt-12 shrink-0 border-r border-white/5">
        <div className="px-10 mb-12">
          <BIRLogo className="h-10" light />
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          {[
            { id: 'settings', icon: Settings, label: 'Global Platform' },
            { id: 'projects', icon: Beaker, label: 'Enrollments Open' },
            { id: 'publications', icon: FilePlus, label: 'Research Assets' },
            { id: 'enrollments', icon: BookOpenCheck, label: 'Applications' },
            { id: 'submissions', icon: MessageSquare, label: 'Client Inquiries' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setEditingItem(null); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all font-bold text-sm ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="p-10 border-t border-white/5 flex items-center gap-3 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <LogOut size={20} /> Exit Console
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 md:p-16 overflow-y-auto max-h-screen">
        <header className="mb-12 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#0f365d] tracking-tighter capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
            <p className="text-slate-500 font-medium">Enterprise data management for BIR Research Global Platform.</p>
          </div>
          {(activeTab === 'projects' || activeTab === 'publications') && !editingItem && (
            <button 
              onClick={() => setEditingItem({})}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <Plus size={20} /> Add New {activeTab === 'projects' ? 'Project' : 'Publication'}
            </button>
          )}
        </header>

        {/* Persistence Warning */}
        <div className="mb-12 bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start gap-4">
          <ShieldAlert className="text-amber-600 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-amber-900 mb-1">Local Session Notice</h4>
            <p className="text-sm text-amber-700 font-medium">
              Changes made here are currently saved in your browser's local storage. In a full production environment, this console would be connected to a centralized database like Supabase or Firebase to sync changes globally.
            </p>
          </div>
        </div>

        {/* Dynamic Forms / Lists */}
        <div className="max-w-6xl">
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <form onSubmit={saveSettings} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Organization Identity</label>
                    <input name="companyName" defaultValue={data.settings.companyName} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Brand Tagline</label>
                    <input name="tagline" defaultValue={data.settings.tagline} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Executive Mission Summary</label>
                    <textarea name="heroText" rows={5} defaultValue={data.settings.heroText} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium leading-relaxed" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Primary Contact Email</label>
                    <input name="contactEmail" defaultValue={data.settings.contactEmail} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100 flex justify-end">
                  <button type="submit" className="bg-[#0f365d] text-white px-12 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-[#1a4a7a] shadow-lg">
                    <Save size={18} /> Commit Changes
                  </button>
                </div>
              </form>

              {/* Recovery Section */}
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-[#0f365d] mb-2 flex items-center gap-2">
                  <RefreshCcw size={18} /> System Recovery
                </h3>
                <p className="text-sm text-blue-700 font-medium mb-6">
                  If website images are appearing as broken or data seems outdated after an update, click the button below to restore the latest hardcoded system assets.
                </p>
                <button 
                  onClick={handleResetData}
                  className="bg-white text-blue-700 border-2 border-blue-200 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-2"
                >
                  Restore Initial Data (Fix Broken Images)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            editingItem ? (
              <form onSubmit={handleSaveProject} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#0f365d]">{editingItem.id ? 'Edit Project' : 'New Research Project'}</h3>
                  <button type="button" onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600"><X /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                    <input name="title" defaultValue={editingItem.title} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" placeholder="E.g., SGLT2 Inhibitors Review" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Domain</label>
                    <input name="domain" defaultValue={editingItem.domain} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" placeholder="Cardiology / AI" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                    <select name="status" defaultValue={editingItem.status || 'Recruiting'} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <option value="Recruiting">Recruiting</option>
                      <option value="Analysis Phase">Analysis Phase</option>
                      <option value="Manuscript Preparation">Manuscript Preparation</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Available Spots</label>
                    <input type="number" name="spots" defaultValue={editingItem.spots} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Required Background</label>
                    <input name="requiredBackground" defaultValue={editingItem.requiredBackground} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" placeholder="E.g., Medical Student / IMG" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                    <textarea name="description" rows={4} defaultValue={editingItem.description} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 resize-none" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#0f365d] text-white py-4 rounded-xl font-bold mt-4 hover:bg-[#1a4a7a] transition-all">
                  Save & Launch Project
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {data.upcomingPapers.map(p => (
                  <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center group hover:border-blue-300 transition-all">
                    <div>
                      <h4 className="font-bold text-[#0f365d] text-lg">{p.title}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{p.domain} • {p.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingItem(p)} className="p-3 bg-slate-50 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors">
                        <Save size={18} />
                      </button>
                      <button onClick={() => deleteItem('upcomingPapers', p.id)} className="p-3 bg-slate-50 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === 'publications' && (
            editingItem ? (
              <form onSubmit={handleSavePublication} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#0f365d]">{editingItem.id ? 'Edit Publication' : 'New Publication Entry'}</h3>
                  <button type="button" onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600"><X /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Publication Title</label>
                    <input name="title" defaultValue={editingItem.title} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                    <input name="category" defaultValue={editingItem.category} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Image URL (Unsplash)</label>
                    <input name="image" defaultValue={editingItem.image} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">External Link (Journal/DOI)</label>
                    <input name="link" defaultValue={editingItem.link} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">The Problem</label>
                    <textarea name="problem" defaultValue={editingItem.problem} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 resize-none h-24" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Our Solution</label>
                    <textarea name="solution" defaultValue={editingItem.solution} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 resize-none h-24" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Final Outcome</label>
                    <textarea name="outcome" defaultValue={editingItem.outcome} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 resize-none h-24" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Tags (Comma separated)</label>
                    <input name="tags" defaultValue={editingItem.tags?.join(', ')} required className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200" placeholder="AI, Cardiology, Review" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#0f365d] text-white py-4 rounded-xl font-bold mt-4 hover:bg-[#1a4a7a] transition-all">
                  Commit Publication to Portfolio
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.caseStudies.map(cs => (
                  <div key={cs.id} className="bg-white p-6 rounded-2xl border border-slate-200 group hover:border-blue-300 transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="max-w-[80%]">
                        <h4 className="font-bold text-[#0f365d] leading-tight mb-1">{cs.title}</h4>
                        <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{cs.category}</span>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setEditingItem(cs)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Save size={16} /></button>
                        <button onClick={() => deleteItem('caseStudies', cs.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    {cs.link && <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400"><ExternalLink size={12} /> {cs.link.substring(0, 40)}...</div>}
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === 'submissions' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[#0f365d] text-[10px] uppercase tracking-[0.2em] font-black">
                  <tr>
                    <th className="px-8 py-6">Source</th>
                    <th className="px-8 py-6">Domain</th>
                    <th className="px-8 py-6">Message</th>
                    <th className="px-8 py-6 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {data.submissions.length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-16 text-center text-slate-400 italic">No incoming inquiries found.</td></tr>
                  ) : (
                    data.submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-[#0f365d]">{sub.name}</div>
                          <div className="text-xs text-slate-400">{sub.email}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">{sub.subject}</span>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-600"><p className="line-clamp-2">{sub.message}</p></td>
                        <td className="px-8 py-6 text-right text-xs text-slate-500 font-black tracking-widest">{new Date(sub.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'enrollments' && (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[#0f365d] text-[10px] uppercase tracking-[0.2em] font-black">
                  <tr>
                    <th className="px-8 py-6">Applicant</th>
                    <th className="px-8 py-6">Research Paper</th>
                    <th className="px-8 py-6">Background</th>
                    <th className="px-8 py-6 text-right">Applied On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.enrollments || []).length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-16 text-center text-slate-400 italic">No enrollment applications yet.</td></tr>
                  ) : (
                    data.enrollments.map((enroll) => (
                      <tr key={enroll.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-[#0f365d]">{enroll.name}</div>
                          <div className="text-xs text-slate-400">{enroll.email}</div>
                        </td>
                        <td className="px-8 py-6"><div className="text-sm font-bold text-blue-700">{enroll.paperTitle}</div></td>
                        <td className="px-8 py-6">
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">{enroll.background}</span>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-1">{enroll.experience}</p>
                        </td>
                        <td className="px-8 py-6 text-right text-xs text-slate-500 font-black tracking-widest">{new Date(enroll.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
