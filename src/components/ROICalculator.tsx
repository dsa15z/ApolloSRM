"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, DollarSign, Users } from "lucide-react";

interface Inputs {
  students: number;
  staffHours: number;
  hourlyRate: number;
  retentionRate: number;
  tuitionPerStudent: number;
}

function calculate(inputs: Inputs) {
  const { students, staffHours, hourlyRate, retentionRate, tuitionPerStudent } = inputs;

  // Time savings: 40% reduction in manual admin tasks
  const weeklyHoursSaved = staffHours * 0.4;
  const annualHoursSaved = weeklyHoursSaved * 50;
  const adminSavings = annualHoursSaved * hourlyRate;

  // Retention improvement: 15% improvement on gap-to-100%
  const retentionGap = 100 - retentionRate;
  const retentionImprovement = retentionGap * 0.15;
  const additionalRetainedStudents = Math.round(
    students * (retentionImprovement / 100)
  );
  const retentionRevenue = additionalRetainedStudents * tuitionPerStudent;

  // Enrollment efficiency: 20% faster pipeline conversion
  const enrollmentGain = Math.round(students * 0.05);
  const enrollmentRevenue = enrollmentGain * tuitionPerStudent;

  const totalAnnualValue = adminSavings + retentionRevenue + enrollmentRevenue;

  return {
    weeklyHoursSaved: Math.round(weeklyHoursSaved),
    annualHoursSaved: Math.round(annualHoursSaved),
    adminSavings: Math.round(adminSavings),
    additionalRetainedStudents,
    retentionRevenue: Math.round(retentionRevenue),
    enrollmentGain,
    enrollmentRevenue: Math.round(enrollmentRevenue),
    totalAnnualValue: Math.round(totalAnnualValue),
  };
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    students: 500,
    staffHours: 80,
    hourlyRate: 25,
    retentionRate: 70,
    tuitionPerStudent: 15000,
  });

  const results = calculate(inputs);

  const update = (key: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id="roi" className="relative py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
            ROI Calculator
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            See Your{" "}
            <span className="gradient-text">Projected Savings</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Enter your institution&apos;s numbers to see the estimated annual
            impact of switching to ApolloSRM.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 rounded-2xl border border-white/5 bg-white/[0.02] p-8"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Calculator className="h-5 w-5 text-apollo-400" />
              Your Institution
            </h3>

            <div>
              <label className="mb-2 flex justify-between text-sm text-gray-300">
                <span>Total enrolled students</span>
                <span className="font-mono text-apollo-400">{inputs.students.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={inputs.students}
                onChange={(e) => update("students", Number(e.target.value))}
                className="w-full accent-apollo-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm text-gray-300">
                <span>Staff hours on admin tasks / week</span>
                <span className="font-mono text-apollo-400">{inputs.staffHours}h</span>
              </label>
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={inputs.staffHours}
                onChange={(e) => update("staffHours", Number(e.target.value))}
                className="w-full accent-apollo-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm text-gray-300">
                <span>Average hourly staff cost</span>
                <span className="font-mono text-apollo-400">${inputs.hourlyRate}</span>
              </label>
              <input
                type="range"
                min={15}
                max={75}
                step={1}
                value={inputs.hourlyRate}
                onChange={(e) => update("hourlyRate", Number(e.target.value))}
                className="w-full accent-apollo-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm text-gray-300">
                <span>Current retention rate</span>
                <span className="font-mono text-apollo-400">{inputs.retentionRate}%</span>
              </label>
              <input
                type="range"
                min={40}
                max={95}
                step={1}
                value={inputs.retentionRate}
                onChange={(e) => update("retentionRate", Number(e.target.value))}
                className="w-full accent-apollo-500"
              />
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm text-gray-300">
                <span>Average annual tuition per student</span>
                <span className="font-mono text-apollo-400">
                  {formatCurrency(inputs.tuitionPerStudent)}
                </span>
              </label>
              <input
                type="range"
                min={5000}
                max={50000}
                step={1000}
                value={inputs.tuitionPerStudent}
                onChange={(e) =>
                  update("tuitionPerStudent", Number(e.target.value))
                }
                className="w-full accent-apollo-500"
              />
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Total */}
            <div className="glow rounded-2xl border border-apollo-500/20 bg-apollo-500/5 p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-apollo-300">
                Estimated Annual Impact
              </p>
              <p className="mt-3 text-5xl font-extrabold text-white">
                {formatCurrency(results.totalAnnualValue)}
              </p>
              <p className="mt-2 text-sm text-gray-400">
                per year in savings and additional revenue
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Administrative Savings</h4>
                    <span className="text-lg font-bold text-blue-400">
                      {formatCurrency(results.adminSavings)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    {results.weeklyHoursSaved}h saved/week ({results.annualHoursSaved}h/year)
                    through automation of manual tasks
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Retention Revenue</h4>
                    <span className="text-lg font-bold text-emerald-400">
                      {formatCurrency(results.retentionRevenue)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    {results.additionalRetainedStudents} additional students
                    retained through AI-powered early intervention
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Enrollment Growth</h4>
                    <span className="text-lg font-bold text-purple-400">
                      {formatCurrency(results.enrollmentRevenue)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    {results.enrollmentGain} additional enrollments through
                    optimized recruitment pipeline
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-600">
              Estimates based on industry averages. Actual results may vary.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
