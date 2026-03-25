"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Bell,
  Calendar,
  GraduationCap,
  DollarSign,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

function MiniChart() {
  const bars = [35, 55, 45, 70, 60, 80, 75, 90, 85, 95];
  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
          className="w-full rounded-sm bg-gradient-to-t from-apollo-500 to-apollo-300"
        />
      ))}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-gray-500" />
        <span
          className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}
        >
          {change}
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export default function ProductDemo() {
  const { t } = useI18n();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            {t.productDemo.label}
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t.productDemo.title}{" "}
            <span className="gradient-text">{t.productDemo.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            {t.productDemo.description}
          </p>
        </motion.div>

        {/* Mock Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glow-strong mt-16 rounded-2xl border border-white/10 bg-navy-900/80 p-1 backdrop-blur-sm"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <p className="ml-3 text-xs text-gray-500">
              {t.productDemo.titleBar}
            </p>
          </div>

          <div className="p-6">
            {/* Stat cards row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard
                icon={Users}
                label={t.productDemo.activeStudents}
                value="1,247"
                change="+12%"
                positive
              />
              <StatCard
                icon={GraduationCap}
                label={t.productDemo.graduationRate}
                value="87.3%"
                change="+4.2%"
                positive
              />
              <StatCard
                icon={TrendingUp}
                label={t.productDemo.enrollmentPipeline}
                value="342"
                change="+23%"
                positive
              />
              <StatCard
                icon={DollarSign}
                label={t.productDemo.revenueYtd}
                value="$2.4M"
                change="+8.5%"
                positive
              />
            </div>

            {/* Main content area */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Chart area */}
              <div className="lg:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    {t.productDemo.enrollmentTrend}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {t.productDemo.last10Months}
                  </span>
                </div>
                <div className="mt-4">
                  <MiniChart />
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-apollo-500" />
                    {t.productDemo.newEnrollments}
                  </span>
                </div>
              </div>

              {/* Alerts panel */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                <h3 className="text-sm font-semibold">{t.productDemo.recentAlerts}</h3>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      icon: AlertTriangle,
                      text: t.productDemo.alertAtRisk,
                      color: "text-amber-400",
                      bg: "bg-amber-400/10",
                    },
                    {
                      icon: CheckCircle,
                      text: t.productDemo.alertCompliance,
                      color: "text-emerald-400",
                      bg: "bg-emerald-400/10",
                    },
                    {
                      icon: Bell,
                      text: t.productDemo.alertApplications,
                      color: "text-apollo-400",
                      bg: "bg-apollo-500/10",
                    },
                    {
                      icon: Calendar,
                      text: t.productDemo.alertAccreditation,
                      color: "text-purple-400",
                      bg: "bg-purple-400/10",
                    },
                  ].map((alert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${alert.bg}`}
                      >
                        <alert.icon className={`h-4 w-4 ${alert.color}`} />
                      </div>
                      <p className="text-xs text-gray-300">{alert.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
