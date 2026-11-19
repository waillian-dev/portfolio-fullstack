import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ISkill, SkillCategory } from '../types';
import { Card } from '../components/ui/Card';

const categories: (SkillCategory | 'All')[] = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'Mobile',
  'DevOps & Tools',
];

export const Skills: React.FC<{ skills: ISkill[] }> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Technical Expertise</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Skills & Core Competencies
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill._id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-5 space-y-4 hover:border-primary/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">{skill.name}</span>
                  <span className="text-xs font-semibold text-primary">{skill.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{skill.category}</span>
                  <span>{skill.years} Yrs Exp</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
