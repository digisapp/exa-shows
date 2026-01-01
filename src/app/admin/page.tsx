"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { GlassCard, GlassButton, GlassInput, GlassModal } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import {
  Calendar,
  Ticket,
  Users,
  Video,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  Check,
  X,
} from "lucide-react";

interface Show {
  id: string;
  title: string;
  city: string;
  country: string;
  eventDate: string;
  status: string;
  showType: string;
}

interface Stats {
  shows: number;
  tickets: number;
  users: number;
  videos: number;
  revenue: number;
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <GlassCard padding="md">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        <div>
          <p className="text-white/60 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </GlassCard>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    country: "",
    venueName: "",
    venueAddress: "",
    eventDate: "",
    doorsOpen: "",
    showStart: "",
    showType: "fashion",
    status: "draft",
    description: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (!authLoading && user && !isAdmin) {
      router.push("/");
      return;
    }

    if (isAdmin) {
      fetchData();
    }
  }, [authLoading, user, isAdmin, router]);

  async function fetchData() {
    try {
      const [statsRes, showsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/shows"),
      ]);

      const statsData = await statsRes.json();
      const showsData = await showsRes.json();

      setStats(statsData.stats);
      setShows(showsData.shows || []);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const method = editingShow ? "PUT" : "POST";
      const body = editingShow
        ? { id: editingShow.id, ...formData }
        : formData;

      const res = await fetch("/api/admin/shows", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowModal(false);
        setEditingShow(null);
        resetForm();
        fetchData();
      }
    } catch (error) {
      console.error("Failed to save show:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this show?")) return;

    try {
      const res = await fetch(`/api/admin/shows?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete show:", error);
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      city: "",
      country: "",
      venueName: "",
      venueAddress: "",
      eventDate: "",
      doorsOpen: "",
      showStart: "",
      showType: "fashion",
      status: "draft",
      description: "",
    });
  }

  function openEditModal(show: Show) {
    setEditingShow(show);
    setFormData({
      title: show.title,
      city: show.city || "",
      country: show.country || "",
      venueName: "",
      venueAddress: "",
      eventDate: show.eventDate ? show.eventDate.split("T")[0] : "",
      doorsOpen: "",
      showStart: "",
      showType: show.showType || "fashion",
      status: show.status || "draft",
      description: "",
    });
    setShowModal(true);
  }

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-12 min-h-screen flex items-center justify-center">
          <Loader2 size={48} className="animate-spin text-[#FF69B4]" />
        </main>
        <Footer />
      </>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Admin Dashboard
              </h1>
              <p className="text-white/60 mt-1">
                Manage shows, tickets, and applications
              </p>
            </div>
            <GlassButton
              variant="primary"
              leftIcon={<Plus size={18} />}
              onClick={() => {
                resetForm();
                setEditingShow(null);
                setShowModal(true);
              }}
            >
              Add Show
            </GlassButton>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard
              label="Total Shows"
              value={stats?.shows || 0}
              icon={Calendar}
              color="#FF69B4"
            />
            <StatCard
              label="Tickets Sold"
              value={stats?.tickets || 0}
              icon={Ticket}
              color="#00BFFF"
            />
            <StatCard
              label="Total Users"
              value={stats?.users || 0}
              icon={Users}
              color="#9400D3"
            />
            <StatCard
              label="Videos"
              value={stats?.videos || 0}
              icon={Video}
              color="#FFED4E"
            />
            <StatCard
              label="Revenue"
              value={`$${(stats?.revenue || 0).toLocaleString()}`}
              icon={DollarSign}
              color="#00FF88"
            />
          </div>

          {/* Shows Table */}
          <GlassCard padding="none">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">All Shows</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/60 font-medium">
                      Title
                    </th>
                    <th className="text-left p-4 text-white/60 font-medium">
                      Location
                    </th>
                    <th className="text-left p-4 text-white/60 font-medium">
                      Date
                    </th>
                    <th className="text-left p-4 text-white/60 font-medium">
                      Type
                    </th>
                    <th className="text-left p-4 text-white/60 font-medium">
                      Status
                    </th>
                    <th className="text-right p-4 text-white/60 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-white/60">
                        No shows yet. Click &quot;Add Show&quot; to create one.
                      </td>
                    </tr>
                  ) : (
                    shows.map((show) => (
                      <tr
                        key={show.id}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="p-4 text-white font-medium">
                          {show.title}
                        </td>
                        <td className="p-4 text-white/80">
                          {show.city}, {show.country}
                        </td>
                        <td className="p-4 text-white/80">
                          {show.eventDate
                            ? new Date(show.eventDate).toLocaleDateString()
                            : "TBD"}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#FF69B4]/20 text-[#FF69B4] capitalize">
                            {show.showType}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                              show.status === "published"
                                ? "bg-green-500/20 text-green-400"
                                : show.status === "live"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {show.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                router.push(`/shows/${show.id}`)
                              }
                              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => openEditModal(show)}
                              className="p-2 text-white/60 hover:text-[#00BFFF] hover:bg-white/10 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(show.id)}
                              className="p-2 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />

      {/* Add/Edit Show Modal */}
      <GlassModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingShow(null);
          resetForm();
        }}
        title={editingShow ? "Edit Show" : "Add New Show"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Title *
            </label>
            <GlassInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Miami Swim Week 2025"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                City *
              </label>
              <GlassInput
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Miami"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Country *
              </label>
              <GlassInput
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                placeholder="USA"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Venue Name
            </label>
            <GlassInput
              value={formData.venueName}
              onChange={(e) =>
                setFormData({ ...formData, venueName: e.target.value })
              }
              placeholder="W South Beach"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Event Date *
            </label>
            <GlassInput
              type="date"
              value={formData.eventDate}
              onChange={(e) =>
                setFormData({ ...formData, eventDate: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Show Type
              </label>
              <select
                value={formData.showType}
                onChange={(e) =>
                  setFormData({ ...formData, showType: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#FF69B4]"
              >
                <option value="fashion">Fashion</option>
                <option value="swimwear">Swimwear</option>
                <option value="resortwear">Resortwear</option>
              </select>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#FF69B4]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="live">Live</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <GlassButton
              type="button"
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                setEditingShow(null);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </GlassButton>
            <GlassButton type="submit" variant="primary" className="flex-1">
              {editingShow ? "Update Show" : "Create Show"}
            </GlassButton>
          </div>
        </form>
      </GlassModal>
    </>
  );
}
