import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, ChevronDown, ChevronUp, Copy, ArrowUp, Briefcase, Award, GraduationCap, Target, Cpu, LineChart, Wrench, Check, ChevronRight, CheckCircle2 } from 'lucide-react';

const KHAKI_BG = "bg-[#fbf9f6]";
const BLUE_BG = "bg-[#f0f4f9]";

const experiences = [
  {
    company: "深圳货拉拉科技有限公司",
    role: "AI产品经理实习生",
    date: "2025.12 - 2026.04",
    content: (
      <div className="space-y-4">
        <p><strong>核心项目：</strong>负责集团AI智能平台产品优化，实现平台使用降门槛化；参与AI赋能外呼业务线多场景解决方案设计。</p>
        <ul className="list-disc pl-5 mt-2 space-y-2 text-sm md:text-base text-slate-600">
           <li>设计AI外呼订单撮合流程和对话策略（核对需求、司机谈判等）。</li>
           <li>主导AI平台工作流搭建及测试，针对意图分类与生成回复进行badcase分析、prompt修改与RAG知识库整理。</li>
           <li>梳理单节点耗时并申请自部署模型优化时延，提升用户体验。</li>
        </ul>
        <div className="mt-4 p-4 bg-[#fbf9f6] rounded-xl border-l-4 border-l-[#00f2ff] shadow-sm">
          <p className="font-semibold text-slate-700 mb-1">关键数据与成果：</p>
          <p className="text-sm md:text-base text-slate-600">
            完成线上场景闭环，AI外呼上线撮合订单提升 <span className="font-bold text-[#008b96] text-lg">4%</span>，外呼取消率精准降至 <span className="font-bold text-[#008b96] text-lg">37.6%</span>。
          </p>
        </div>
      </div>
    )
  },
  {
    company: "亚信科技(中国)有限公司",
    role: "产品经理实习生",
    date: "2025.06 - 2025.12",
    content: (
      <div className="space-y-4">
        <p><strong>核心项目：</strong>0-1搭建基于LLM+RAG架构的内部企业智能问答助手。</p>
        <ul className="list-disc pl-5 mt-2 space-y-2 text-sm md:text-base text-slate-600">
           <li>主导大模型选型（3看1测），梳理场景并输出意图体系。</li>
           <li>与数据运营团队协同搭建知识库，清洗整合超2000条文档，完成OCR识别切块。</li>
           <li>设计结构化Prompt并建立系统评价指标体系(Top1准确率等)，推动体验提升。</li>
        </ul>
        <div className="mt-4 p-4 bg-[#fbf9f6] rounded-xl border-l-4 border-l-[#00f2ff] shadow-sm">
          <p className="font-semibold text-slate-700 mb-1">关键数据与成果：</p>
          <p className="text-sm md:text-base text-slate-600">
            系统内部使用率达 <span className="font-bold text-[#008b96] text-lg">80%</span>，用户满意度达 <span className="font-bold text-[#008b96] text-lg">93.6%</span>，答案溯源准确率 <span className="font-bold text-[#008b96] text-lg">91.5%</span>。
          </p>
        </div>
      </div>
    )
  },
  {
    company: "中移互联网有限公司",
    role: "产品经理",
    date: "2023.12 - 2024.08",
    content: (
      <div className="space-y-4">
        <p><strong>核心项目：</strong>统一埋点增长分析平台 (DataFinder) 部署与应用。</p>
        <ul className="list-disc pl-5 mt-2 space-y-2 text-sm md:text-base text-slate-600">
           <li>协助搭建集团统一埋点建设标准化流程规范，输出工作流程方案等。</li>
           <li>负责5条业务线埋点全流程工作，处理超50次痛点接入与8+埋点方案输出。</li>
           <li>搭建数据看板，全链路支撑A/B Test方案并在业务中落地验证。</li>
        </ul>
        <div className="mt-4 p-4 bg-[#fbf9f6] rounded-xl border-l-4 border-l-[#00f2ff] shadow-sm">
          <p className="font-semibold text-slate-700 mb-1">关键数据与成果：</p>
          <p className="text-sm md:text-base text-slate-600">
            埋点日采集量攀升至 <span className="font-bold text-[#008b96] text-lg">2.97 亿条</span>，验证时间缩减至 <span className="font-bold text-[#008b96] text-lg">2-3小时</span>，实现质的跃升。
          </p>
        </div>
      </div>
    )
  }
];

const projects = [
  {
    title: "AI智能外呼解决方案",
    icon: <Phone className="w-6 h-6 text-[#008b96]" />,
    background: "人工拨打意向客户效率低下，外呼转化有限且存在大量订单流失风险。",
    solution: "规划基于大模型的外呼工作流，设计精准的撮合策略与动态询问树。",
    result: "取消率降至 37.6%"
  },
  {
    title: "企业智能问答助手",
    icon: <Briefcase className="w-6 h-6 text-[#008b96]" />,
    background: "企业内知识资产极为碎片化，跨部门信息沟通成本过高。",
    solution: "引入 LLM+RAG 架构，梳理超2000卷文档并完成向量化结构化。",
    result: "溯源准确率 91.5%"
  },
  {
    title: "DataFinder分析平台",
    icon: <LineChart className="w-6 h-6 text-[#008b96]" />,
    background: "原有埋点数据零散且标准不一，难以赋能精细化增长分析。",
    solution: "推进标准化工作流与埋点方案制定，深度结合看板反馈赋能业务。",
    result: "日采集 2.97 亿条"
  }
];

const skills = [
  {
    title: "产品能力",
    icon: <Target className="w-5 h-5 text-[#008b96]" />,
    items: ["需求分析", "产品规划", "项目管理", "原型设计"]
  },
  {
    title: "AI能力",
    icon: <Cpu className="w-5 h-5 text-[#008b96]" />,
    items: ["大模型选型", "Prompt设计", "RAG架构", "智能体、工作流搭建"]
  },
  {
    title: "数据能力",
    icon: <LineChart className="w-5 h-5 text-[#008b96]" />,
    items: ["埋点设计", "数据分析", "A/B测试", "数据看板"]
  },
  {
    title: "工具技能",
    icon: <Wrench className="w-5 h-5 text-[#008b96]" />,
    items: ["Axure", "墨刀", "Visio", "XMind", "SQL", "Vibe Coding"]
  }
];

function AccordionItem({ item }: { key?: React.Key; item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 mb-6" 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800 md:flex items-center gap-2">
            <span className="hidden md:inline-flex bg-[#00f2ff]/10 p-2 rounded-lg text-[#008b96]">
              <Briefcase className="w-5 h-5" />
            </span>
            {item.company}
          </h3>
          <p className="text-sm text-slate-500 mt-2 font-medium bg-slate-100/50 inline-block px-3 py-1 rounded-full">{item.role} | {item.date}</p>
        </div>
        <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#00f2ff]/20 text-[#008b96]' : 'bg-slate-100 text-slate-400'}`}>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-4 border-t-2 border-slate-50">
               {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionWrapper({ id, bg, children }: { id: string, bg: string, children: React.ReactNode }) {
  return (
    <section id={id} className={`py-32 min-h-screen flex items-center justify-center ${bg} relative overflow-hidden`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl mx-auto px-6 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-slate-800 bg-[#fbf9f6]">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold tracking-tight">
            李谟东 <span className="text-slate-400 mx-2">|</span> <span className="font-medium text-lg">AI 产品经理</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {['首页', '实习及工作经验', '项目', '能力', '联系'].map((item, i) => (
              <button 
                key={item} 
                onClick={() => scrollTo(['home', 'experience', 'projects', 'skills', 'contact'][i])}
                className="text-slate-600 hover:text-[#008b96] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab 1: Home */}
      <SectionWrapper id="home" bg={KHAKI_BG}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <span className="inline-block py-1.5 px-4 rounded-full bg-[#00f2ff]/10 text-[#008b96] font-semibold text-sm mb-6 border border-[#00f2ff]/20">
                  Hi! 有志投身AI产品的实践者
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
                  产品实习生<br/><span className="text-[#008b96]">AI方向</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-medium mb-4">
                  正在寻找 <span className="text-[#008b96] font-bold px-1">~实习机会</span>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium mb-0">
                  <CheckCircle2 className="w-5 h-5 text-[#008b96]"/>
                  可实习：5天/周 · 6个月及以上
                </p>
              </motion.div>
            </div>

            {/* Education & Awards styling based on image 0 grids */}
            <div className="grid gap-6 mt-12 md:mt-0">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/60">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#e8f8f9] rounded-lg text-[#008b96]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">教育背景</h2>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-slate-200 pl-3 relative">
                    <div className="absolute w-2.5 h-2.5 bg-[#008b96] rounded-full -left-[6px] top-1 ring-4 ring-white"></div>
                    <p className="font-bold text-base">上海应用技术大学</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">工程管理 硕士 · 经济与管理学院</p>
                    <p className="text-xs font-semibold text-[#008b96] mt-1.5 bg-[#00f2ff]/10 inline-block px-1.5 py-0.5 rounded">GPA: 3.7 / 4.0</p>
                  </div>
                  <div className="border-l-2 border-slate-200 pl-3 relative">
                    <div className="absolute w-2.5 h-2.5 bg-slate-300 rounded-full -left-[6px] top-1 ring-4 ring-white"></div>
                    <p className="font-bold text-base">三亚学院</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">人力资源管理 本科 · 管理学院</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1.5">GPA: 3.3 / 4.0</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#00f2ff]/5 p-8 rounded-3xl shadow-sm border border-[#00f2ff]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white rounded-xl text-[#008b96] shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">荣誉奖项</h2>
                </div>
                <div className="flex flex-wrap gap-2 text-sm font-medium">
                  {['国家奖学金', '三等奖学金', '全国创新企业决策三等奖', '企业模拟决策全国三等奖', '研究生会科创实践部部长', '优秀共青团干部'].map((award, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-[#00f2ff]/10 rounded-lg text-slate-700">
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Tab 2: Experience */}
      <SectionWrapper id="experience" bg={BLUE_BG}>
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">实习及工作经验</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">从 0 到 1 推动 AI 场景落地，以数据驱动业务增长的核心实战经历。</p>
        </div>
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <AccordionItem key={index} item={exp} />
          ))}
        </div>
      </SectionWrapper>

      {/* Tab 3: Projects */}
      <SectionWrapper id="projects" bg={KHAKI_BG}>
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">核心项目</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">专注于业务痛点挖掘、方案设计与商业指标交付。</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white hover:border-[#00f2ff]/50 hover:shadow-lg transition-all duration-300 flex flex-col group">
              <div className="p-4 bg-[#f0f4f9] rounded-2xl inline-block w-fit mb-6 text-[#008b96] group-hover:scale-110 transition-transform">
                {proj.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6">{proj.title}</h3>
              
              <div className="space-y-5 flex-grow">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">背景痛点 BACKGROUND</p>
                  <p className="text-slate-600 font-medium leading-relaxed">{proj.background}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">方案流程 SOLUTION</p>
                  <p className="text-slate-600 font-medium leading-relaxed">{proj.solution}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">数据成果 RESULT</p>
                 <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-[#008b96]">{proj.result}</p>
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#008b96] group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Tab 4: Skills */}
      <SectionWrapper id="skills" bg={BLUE_BG}>
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">能力与工具储备</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-[#00f2ff]/10 hover:border-[#00f2ff]/60 shadow-sm hover:shadow-[#008b96]/10 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#e8f8f9] rounded-xl text-[#008b96]">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{skill.title}</h3>
              </div>
              <ul className="space-y-4">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#008b96]/40"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Tab 5: Contact */}
      <SectionWrapper id="contact" bg={KHAKI_BG}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-8">准备好共创好产品了吗？</h2>
          <p className="text-xl text-slate-500 mb-12">随时欢迎通过以下方式与我取得联系，期待交流！</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 p-8 rounded-3xl shadow-sm border border-white flex flex-col items-center justify-center">
              <Phone className="w-10 h-10 text-[#008b96] mb-4" />
              <p className="text-2xl font-bold text-slate-800 tracking-wider mb-6">166 2001 3401</p>
              <button 
                onClick={() => navigator.clipboard.writeText('16620013401')}
                className="text-sm font-bold text-[#008b96] bg-[#00f2ff]/10 px-6 py-2.5 rounded-full hover:bg-[#00f2ff]/20 transition-colors"
              >
                一键复制电话
              </button>
            </div>
            <div className="bg-white/80 p-8 rounded-3xl shadow-sm border border-white flex flex-col items-center justify-center">
              <Mail className="w-10 h-10 text-[#008b96] mb-4" />
              <p className="text-xl font-bold text-slate-800 mb-6 font-mono">limodong@outlook.com</p>
              <button 
                onClick={() => navigator.clipboard.writeText('limodong@outlook.com')}
                className="text-sm font-bold text-[#008b96] bg-[#00f2ff]/10 px-6 py-2.5 rounded-full hover:bg-[#00f2ff]/20 transition-colors"
              >
                一键复制邮箱
              </button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-8 bg-white text-slate-400 text-center relative border-t border-slate-100">
        <p className="font-medium text-sm">© {new Date().getFullYear()} 李谟东. All rights reserved.</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#fbf9f6] text-slate-400 hover:text-[#008b96] hover:bg-[#00f2ff]/10 flex items-center justify-center shadow-sm border border-slate-200 transition-all"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
}

