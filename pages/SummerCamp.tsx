import React, { useState, useEffect } from 'react';
import { Camera, Star, Calendar, Clock, Users, Award, Play, ChevronRight, Quote, AlertCircle, Film, Clapperboard, Video, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function SummerCamp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;

    // --- MANUAL VALIDATION FOR MOBILE BROWSERS ---
    const requiredElements = form.querySelectorAll('[required]');
    let firstInvalidElement: HTMLElement | null = null;
    let hasErrors = false;

    // Reset previous error styles
    form.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border', '!border-red-500'));
    form.querySelectorAll('.error-text').forEach(el => el.remove());

    requiredElements.forEach((el) => {
      const input = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      let isInvalid = false;

      if (input.type === 'radio' || input.type === 'checkbox') {
        const name = input.name;
        const checked = form.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
          isInvalid = true;
        }
      } else if (!input.value.trim()) {
        isInvalid = true;
      }

      if (isInvalid) {
        hasErrors = true;
        // Find the closest container to add red border
        const container = input.type === 'radio' || input.type === 'checkbox' 
          ? input.closest('.flex.gap-3') || input.parentElement
          : input;
          
        if (container) {
          container.classList.add('error-border', '!border-red-500');
          // Add error message text if not already there
          if (!container.parentElement?.querySelector('.error-text')) {
            const errorText = document.createElement('div');
            errorText.className = 'error-text text-red-500 text-xs mt-1 font-bold';
            errorText.innerText = '此项为必填项 (This field is required)';
            container.parentElement?.appendChild(errorText);
          }
        }

        if (!firstInvalidElement) {
          firstInvalidElement = container as HTMLElement;
        }
      }
    });

    if (hasErrors) {
      setIsSubmitting(false);
      alert('请填写所有必填项 (Please fill in all required fields). 标红的区域为必填。');
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    // --- END MANUAL VALIDATION ---

    const compressImage = (file: File): Promise<File> => {
      return new Promise((resolve) => {
        if (!file.type.startsWith('image/')) {
          resolve(file);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1920;
            const MAX_HEIGHT = 1920;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
              if (blob) {
                try {
                  resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
                } catch (e) {
                  // Fallback for older browsers that don't support File constructor
                  resolve(file);
                }
              } else {
                resolve(file);
              }
            }, 'image/jpeg', 0.8);
          };
          img.onerror = () => resolve(file);
        };
        reader.onerror = () => resolve(file);
      });
    };

    const originalFormData = new FormData(form);
    const payloadData = new FormData();
    const sources: string[] = [];
    
    // Check file sizes and compress images before submitting
    for (const [key, value] of originalFormData.entries()) {
      if (key === 'source') {
        sources.push(value.toString());
      } else if (value instanceof File && value.size > 0) {
        let fileToUpload = value;
        
        if (value.type.startsWith('image/')) {
          try {
            fileToUpload = await compressImage(value);
          } catch (e) {
            console.error("Compression error:", e);
          }
        }
        
        // Strict file size check AFTER compression (limit to 5MB to prevent Nginx connection drop)
        if (fileToUpload.size > 5 * 1024 * 1024) {
          alert(`文件 ${value.name} 太大 (${(fileToUpload.size / 1024 / 1024).toFixed(1)}MB)。请上传小于 5MB 的文件。如果是照片，请尝试截屏后再上传。`);
          setIsSubmitting(false);
          return;
        }
        
        payloadData.append(key, fileToUpload);
      } else if (!(value instanceof File)) {
        payloadData.append(key, value);
      }
    }
    
    if (sources.length > 0) {
      payloadData.append('howDidYouHearAboutUs', sources.join(', '));
    }

   console.log("Submitting application to Formspree...");
    try {
const response = await fetch("/api/submit-form", {
  method: "POST",
  body: payloadData,
});
      
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          document.getElementById('successMsg')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        let errorMessage = 'Please try again.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          if (errorData.suggestion) {
            errorMessage += `\nSuggestion: ${errorData.suggestion}`;
          }
        } catch (parseError) {
          if (response.status === 413) {
            errorMessage = '上传的文件太大，请压缩照片或简历后再试 (File too large).';
          } else if (response.status === 404) {
            errorMessage = `找不到提交接口 (404 API not found). Please help the developer check the server routes.`;
          } else {
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
        }
        alert(`提交失败 (Failed to submit): ${errorMessage}`);
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      alert(`网络错误 (Network error): ${error.message || 'Please check your connection.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goldText = "bg-gradient-to-r from-[#F0C45A] via-[#C9A84C] to-[#8B6914] text-transparent bg-clip-text";
  const goldBg = "bg-gradient-to-r from-[#C9A84C] to-[#8B6914] text-black";
  const goldBorder = "border-[#C9A84C]/30";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] font-sans selection:bg-[#C9A84C] selection:text-black relative">
      
      {/* Film Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-30 mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")" }}></div>

      {/* Filmstrip Top Decoration */}
      <div className="w-full h-9 bg-[#1A1A1A] flex items-center overflow-hidden border-b border-[#8B6914] relative mt-16">
        <div className="absolute whitespace-nowrap text-[#8B6914] text-lg tracking-[4px] animate-[filmroll_12s_linear_infinite]">
          ▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯▮▯
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes filmroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}} />

      {/* Hero Section with Image Background */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background Image */}
        <img 
          src="https://i.ibb.co/3YzTyKhj/202603221706.jpg" 
          alt="Hollywood Camp" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ objectPosition: '50% 15%' }} // Focuses on the top half of the image
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlay to blend into black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#0A0A0A]"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto mt-12">
          <div className="font-['Bebas_Neue'] text-[clamp(14px,3vw,18px)] tracking-[6px] text-[#C9A84C] mb-3 opacity-90 drop-shadow-lg">
            ALT · HOLLYWOOD DREAM STAR · 好莱坞童星机构
          </div>
          <h1 className={`font-serif text-[clamp(32px,6vw,64px)] font-black leading-[1.15] mb-4 ${goldText} drop-shadow-2xl`}>
            2026 好莱坞电影拍摄夏令营
          </h1>
          <div className="text-[clamp(14px,2.5vw,18px)] text-[#F0C45A] tracking-[1px] mb-2 font-light drop-shadow-md">
            由好莱坞电影节获奖团队倾力打造 · THE GRDEN
          </div>
          <div className="text-[clamp(12px,2vw,15px)] text-gray-300 tracking-[2px] uppercase mt-4 drop-shadow-md">
            绝非普通夏令营 ｜ 真正的、全程记录的电影拍摄体验
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 mx-auto mb-12 mt-8 max-w-[600px] px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></div>
        <span className="text-[#C9A84C] text-xl">🎬</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></div>
      </div>

      {/* Session Dates */}
      <div className="flex justify-center gap-6 px-4 mb-16 flex-wrap">
        <div className="border border-[#C9A84C] py-4 px-8 rounded-sm text-center bg-[#c9a84c0f] hover:bg-[#c9a84c24] transition-colors shadow-[0_0_15px_rgba(201,168,76,0.1)]">
          <div className="font-['Bebas_Neue'] text-[15px] tracking-[4px] text-[#C9A84C] mb-2">第 一 期</div>
          <div className="text-[18px] font-bold text-white">6月15日 – 6月27日</div>
          <div className="text-[13px] text-[#888] mt-2">每日 10:00 AM – 4:00 PM</div>
        </div>
        <div className="border border-[#C9A84C] py-4 px-8 rounded-sm text-center bg-[#c9a84c0f] hover:bg-[#c9a84c24] transition-colors shadow-[0_0_15px_rgba(201,168,76,0.1)]">
          <div className="font-['Bebas_Neue'] text-[15px] tracking-[4px] text-[#C9A84C] mb-2">第 二 期</div>
          <div className="text-[18px] font-bold text-white">7月20日 – 8月1日</div>
          <div className="text-[13px] text-[#888] mt-2">每日 10:00 AM – 4:00 PM</div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[860px] mx-auto px-5 pb-16">

        {/* Previous Content: What to Expect & Schedule */}
        <div className="mb-16">
          <div className="flex items-center gap-3 font-['Bebas_Neue'] text-[22px] tracking-[4px] text-[#C9A84C] mb-8 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
            🎥 营期安排
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] border border-[#c9a84c33] p-6 rounded-lg relative overflow-hidden group hover:border-[#C9A84C] transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A84C] opacity-5 rounded-bl-full -z-10 group-hover:opacity-10 transition-opacity"></div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-[#C9A84C]">第一周:</span> 剧本围读与表演大师课
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                在好莱坞获奖导师的带领下，学员将深入理解剧本，进行专业的角色分析与台词训练。从镜头前的基础站位到深层情绪表达，全面提升表演功底。
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" /> 好莱坞标准剧本围读 (Table Read)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" /> 镜头前表演技巧与走位 (Blocking)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" /> 角色塑造与情绪调动训练</li>
              </ul>
            </div>

            <div className="bg-[#1A1A1A] border border-[#c9a84c33] p-6 rounded-lg relative overflow-hidden group hover:border-[#C9A84C] transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A84C] opacity-5 rounded-bl-full -z-10 group-hover:opacity-10 transition-opacity"></div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-[#C9A84C]">第二周:</span> 实景拍摄与剧组体验
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                进入真实的电影片场！配备好莱坞专业摄制组（灯光、摄影、收音、服化道），学员将作为主演完成一部高质量微电影的拍摄，深度体验真实剧组运作。
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" /> 专业级电影设备实景拍摄</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" /> 剧组实战体验与团队协作</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" /> 评选最佳演员：获奖者将进入 ALT Dream Star 童星库，并推荐给各大经纪公司</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Program Highlights */}
        <div className="flex items-center gap-3 font-['Bebas_Neue'] text-[22px] tracking-[4px] text-[#C9A84C] mb-5 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
          🌟 项目亮点
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: "🎭", title: "主演机会", desc: "获奖导演亲临指导，打造专业个人作品集演示盘" },
            { icon: "🎥", title: "大师导师", desc: "好莱坞专业电影摄制组全程拍摄，大师全程导师辅导" },
            { icon: "🏆", title: "电影节直通", desc: "作品入选国际青少年电影节，走上好莱坞红毯" },
            { icon: "⭐", title: "IMDb 认证", desc: "拍摄影片上线后提交IMDB网站，每个人饰演的角色将保留IMDB演员库，为升学做背书" }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-[#c9a84c33] p-5 rounded border-l-[3px] border-l-[#C9A84C]">
              <div className="text-[22px] mb-2">{item.icon}</div>
              <div className="text-[12px] tracking-[2px] text-[#C9A84C] uppercase mb-1.5">{item.title}</div>
              <div className="text-[14px] text-white leading-[1.6]">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* REGISTRATION FORM */}
        <div className="flex items-center gap-3 font-['Bebas_Neue'] text-[22px] tracking-[4px] text-[#C9A84C] mb-5 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
          📋 报名表
        </div>

        {isSubmitted ? (
          <div id="successMsg" className="bg-[#27ae601f] border border-[#27ae6066] rounded p-8 text-center text-[#7ee8a2] text-[15px] mt-4 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[#27ae60]" />
            <h3 className="text-xl font-bold text-white mb-2">🌟 报名表已成功提交！</h3>
            <p className="mb-4">我们的工作人员将在 2 个工作日内与您联系确认报名信息。</p>
            <p className="text-sm text-white/70">如有疑问请致电：626-382-8849 ｜ 323-918-6688</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            
            {/* Part 1: Student Info */}
            <div className="bg-[#1A1A1A] border border-[#c9a84c40] rounded-md p-6 sm:p-9">
              <div className="text-[16px] font-bold text-[#C9A84C] mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
                一、学员基本信息
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">学员姓名（中文）<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="studentNameZh" required placeholder="请输入中文姓名" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">Student Name (English)<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="studentNameEn" required placeholder="Full name as on ID" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">出生日期<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="date" name="dob" required className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full [color-scheme:dark]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">年龄<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="number" name="age" required min="6" max="17" placeholder="6–17 岁" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">性别<span className="text-[#e74c3c] ml-1">*</span></label>
                  <div className="flex gap-3 flex-wrap mt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="gender" value="男" required className="accent-[#C9A84C]" />男
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="gender" value="女" className="accent-[#C9A84C]" />女
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="gender" value="其他" className="accent-[#C9A84C]" />其他 / 不愿透露
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">选择期次<span className="text-[#e74c3c] ml-1">*</span></label>
                  <div className="flex gap-3 flex-wrap mt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="session" value="第一期" required className="accent-[#C9A84C]" />第一期（6/15–6/27）
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="session" value="第二期" className="accent-[#C9A84C]" />第二期（7/20–8/1）
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="session" value="两期均报名" className="accent-[#C9A84C]" />两期均报名
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">学校名称<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <input type="text" name="school" placeholder="就读学校" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">年级</label>
                  <input type="text" name="grade" placeholder="如：4年级 / Grade 4" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
              </div>
            </div>

            {/* Part 2: Parent/Guardian */}
            <div className="bg-[#1A1A1A] border border-[#c9a84c40] rounded-md p-6 sm:p-9">
              <div className="text-[16px] font-bold text-[#C9A84C] mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
                二、家长 / 监护人信息
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">家长姓名（中文）<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="parentNameZh" required placeholder="请输入姓名" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">Parent Name (English)<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="parentNameEn" required placeholder="Full name" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">与学员关系<span className="text-[#e74c3c] ml-1">*</span></label>
                  <select name="parentRelation" required className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full appearance-none">
                    <option value="" className="bg-[#1a1a1a]">请选择</option>
                    <option value="父亲" className="bg-[#1a1a1a]">父亲</option>
                    <option value="母亲" className="bg-[#1a1a1a]">母亲</option>
                    <option value="祖父母" className="bg-[#1a1a1a]">祖父母</option>
                    <option value="法定监护人" className="bg-[#1a1a1a]">法定监护人</option>
                    <option value="其他" className="bg-[#1a1a1a]">其他</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">联系电话<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="tel" name="parentPhone" required placeholder="手机号码" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">备用联系电话<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="tel" name="parentAltPhone" required placeholder="紧急联系人电话" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">电子邮件<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="email" name="parentEmail" required placeholder="example@email.com" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">家庭住址<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="address" required placeholder="街道地址 / Street Address" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">城市 / City<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="city" required placeholder="Los Angeles" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">邮政编码 / ZIP<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="zip" required placeholder="90001" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
              </div>
            </div>

            {/* Part 3: Emergency Contact */}
            <div className="bg-[#1A1A1A] border border-[#c9a84c40] rounded-md p-6 sm:p-9">
              <div className="text-[16px] font-bold text-[#C9A84C] mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
                三、紧急联系人
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">紧急联系人姓名<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="emergencyName" required placeholder="（须为家长以外的成年人）" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">与学员关系<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="emergencyRelation" required placeholder="如：祖父、叔叔" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">联系电话<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="tel" name="emergencyPhone" required placeholder="紧急联系电话" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">备用电话<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <input type="tel" name="emergencyAltPhone" placeholder="" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">授权接送人员 <span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（除家长外，可接送孩子的人员姓名，每行一个）</span></label>
                  <textarea name="authorizedPickup" placeholder="姓名 1&#10;姓名 2&#10;姓名 3" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>
              </div>
            </div>

            {/* Part 4: Medical Info */}
            <div className="bg-[#1A1A1A] border border-[#c9a84c40] rounded-md p-6 sm:p-9">
              <div className="text-[16px] font-bold text-[#C9A84C] mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
                四、健康与医疗信息
              </div>

              <div className="bg-[#c0392b14] border border-[#c0392b59] rounded p-4 mb-5 flex gap-3 items-start text-[13px] text-[#e0a0a0] leading-[1.7]">
                <span className="text-[18px] shrink-0">⚠️</span>
                <span>以下信息将严格保密，仅用于紧急医疗处置及确保学员安全。请如实完整填写，以便工作人员在紧急情况下做出最佳判断。</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">主治医生 / 儿科医生姓名<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <input type="text" name="doctorName" placeholder="Dr. 姓名" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">医生联系电话<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <input type="tel" name="doctorPhone" placeholder="" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">医疗保险信息<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <input type="text" name="insurance" placeholder="保险公司名称 · 保单号码" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>

                {/* Allergies */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">过敏史<span className="text-[#e74c3c] ml-1">*</span></label>
                  <div className="flex gap-3 flex-wrap mb-2.5">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="allergy" value="无" required className="accent-[#C9A84C]" />无已知过敏
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="allergy" value="有" className="accent-[#C9A84C]" />有过敏史（请详述↓）
                    </label>
                  </div>
                  <textarea name="allergyDetails" placeholder="请注明过敏原（食物、药物、花粉、动物、乳胶等）及过敏反应症状和严重程度。如携带 EpiPen 请注明。" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>

                {/* Hereditary diseases */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">遗传性疾病 / 家族病史<span className="text-[#e74c3c] ml-1">*</span></label>
                  <div className="flex gap-3 flex-wrap mb-2.5">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="hereditary" value="无" required className="accent-[#C9A84C]" />无
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="hereditary" value="有" className="accent-[#C9A84C]" />有（请详述↓）
                    </label>
                  </div>
                  <textarea name="hereditaryDetails" placeholder="请注明相关遗传性疾病或家族病史，包括心脏病、癫痫、哮喘、糖尿病等。" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>

                {/* Current medications */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">目前用药情况<span className="text-[#e74c3c] ml-1">*</span></label>
                  <div className="flex gap-3 flex-wrap mb-2.5">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="meds" value="无" required className="accent-[#C9A84C]" />目前未服用任何药物
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="meds" value="有" className="accent-[#C9A84C]" />正在服药（请详述↓）
                    </label>
                  </div>
                  <textarea name="medsDetails" placeholder="请注明药物名称、剂量、服用频率及用途。如需在营期间服药，请标注是否需要工作人员协助。" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                  <div className="text-[11px] text-[#888] mt-[-2px] leading-[1.5]">* 需在夏令营期间服用的处方药，请另行提交医生授权书</div>
                </div>

                {/* Existing conditions */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">现有医疗状况 / 慢性病<span className="text-[#e74c3c] ml-1">*</span></label>
                  <div className="flex gap-3 flex-wrap mb-2.5">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="conditions" value="无" required className="accent-[#C9A84C]" />无
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                      <input type="radio" name="conditions" value="有" className="accent-[#C9A84C]" />有（请详述↓）
                    </label>
                  </div>
                  <textarea name="conditionsDetails" placeholder="包括但不限于：哮喘、糖尿病、心脏病、癫痫、ADHD、自闭症谱系、焦虑症、抑郁症等。" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>

                {/* Recent illness/surgery */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">近期疾病 / 手术史<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <textarea name="recentIllness" placeholder="过去12个月内是否有住院、手术或重大疾病？请注明。" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>

                {/* Dietary restrictions */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">饮食限制 / 宗教禁忌<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <textarea name="dietary" placeholder="如：素食、清真、犹太洁食、无麸质、坚果过敏等" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>

                {/* Physical limitations */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">活动限制 / 行动能力<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <textarea name="physicalLimits" placeholder="学员是否有任何身体上的活动限制？如需特殊协助或无障碍设施，请注明。" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>

                {/* Additional notes */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">其他医疗备注<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <textarea name="medicalNotes" placeholder="任何其他我们应了解的健康信息，包括心理健康需求、特殊教育需求等。" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>
              </div>
            </div>

            {/* Part 5: Program specific */}
            <div className="bg-[#1A1A1A] border border-[#c9a84c40] rounded-md p-6 sm:p-9">
              <div className="text-[16px] font-bold text-[#C9A84C] mb-6 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
                五、项目相关信息
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">上传个人简历<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填，支持 PDF/Word 等格式）</span></label>
                  <input type="file" name="resume" accept=".pdf,.doc,.docx" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-[#C9A84C] file:text-black hover:file:bg-[#F0C45A] cursor-pointer" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">上传大头照 / 形象照<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填，支持 JPG/PNG 等格式）</span></label>
                  <input type="file" name="headshot" accept="image/*" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-[#C9A84C] file:text-black hover:file:bg-[#F0C45A] cursor-pointer" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">表演 / 影视经验<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <textarea name="experience" placeholder="请简述学员的表演、模特、配音或其他影视相关经历（如无经验也可报名）" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">特长技能<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <textarea name="skills" placeholder="如：舞蹈、武术、乐器、外语、体育特长等" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">报名动机 / 期望收获<span className="text-[#888] text-[10px] tracking-normal normal-case ml-1.5">（选填）</span></label>
                  <textarea name="motivation" placeholder="您希望孩子通过本次夏令营获得什么？" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full min-h-[80px] resize-y"></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">您如何得知本夏令营？</label>
                  <div className="flex gap-3 flex-wrap mt-0.5">
                    {['微信朋友圈', 'Instagram', '朋友推荐', '微信群', 'Google 搜索', '其他'].map((source) => (
                      <label key={source} className="flex items-center gap-2 cursor-pointer text-[14px] text-white bg-white/5 border border-[#c9a84c33] py-2 px-3.5 rounded-sm hover:border-[#C9A84C] hover:bg-[#c9a84c14] transition-all has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#c9a84c14]">
                        <input type="checkbox" name="source" value={source} className="accent-[#C9A84C]" />{source}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Part 6: Consents & Releases */}
            <div className="flex items-center gap-3 font-['Bebas_Neue'] text-[22px] tracking-[4px] text-[#C9A84C] mb-5 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent mt-10">
              ⚖️ 声明与授权
            </div>

            <div className="bg-[#c9a84c0a] border border-[#c9a84c40] rounded p-5 mb-4">
              <div className="text-[12px] tracking-[2px] text-[#C9A84C] uppercase mb-2.5 font-bold">📸 媒体使用授权</div>
              <div className="text-[12px] text-[#aaa] leading-[1.8] mb-3.5">
                本夏令营活动期间将进行专业拍摄，包括照片、视频及影片制作。所产生的影像素材可能用于宣传推广、社交媒体、教育展示及相关电影节放映等目的。ALT Hollywood Dream Star / THE GRDEN 将妥善保管所有素材，不会将其出售给第三方商业机构。
              </div>
              <label className="flex items-start gap-2.5 text-[13px] text-white cursor-pointer">
                <input type="checkbox" name="consentMedia" required className="accent-[#C9A84C] mt-1 shrink-0" />
                <span>本人同意 ALT Hollywood Dream Star / THE GRDEN 使用学员在夏令营期间的照片、视频及影片素材，用于宣传推广及教育相关目的。<span className="text-[#e74c3c]">*</span></span>
              </label>
            </div>

            <div className="bg-[#c9a84c0a] border border-[#c9a84c40] rounded p-5 mb-4">
              <div className="text-[12px] tracking-[2px] text-[#C9A84C] uppercase mb-2.5 font-bold">🏥 医疗授权声明</div>
              <div className="text-[12px] text-[#aaa] leading-[1.8] mb-3.5">
                紧急情况下，若本人（家长/监护人）无法及时联系，本人授权 ALT Hollywood Dream Star / THE GRDEN 工作人员代为联系医疗机构并同意必要的紧急医疗处置。本人承诺上述填写的所有医疗信息真实准确，若有变化将及时更新通知。
              </div>
              <label className="flex items-start gap-2.5 text-[13px] text-white cursor-pointer">
                <input type="checkbox" name="consentMedical" required className="accent-[#C9A84C] mt-1 shrink-0" />
                <span>本人授权夏令营工作人员在紧急情况下为学员寻求必要的医疗救助，且确认本表单内医疗信息真实完整。<span className="text-[#e74c3c]">*</span></span>
              </label>
            </div>

            <div className="bg-[#c9a84c0a] border border-[#c9a84c40] rounded p-5 mb-4">
              <div className="text-[12px] tracking-[2px] text-[#C9A84C] uppercase mb-2.5 font-bold">⚠️ 责任豁免与安全声明</div>
              <div className="text-[12px] text-[#aaa] leading-[1.8] mb-3.5">
                本夏令营活动时间为每日 <strong className="text-[#C9A84C] font-normal">上午10:00至下午4:00</strong>，活动期间学员须遵守全部安全规程及行为准则。参与者及家长/监护人了解并接受，参与影视拍摄活动存在一定风险，包括但不限于户内外拍摄环境、专业器材操作等。ALT Hollywood Dream Star 将采取一切合理措施确保学员安全，但对于学员故意违规或隐瞒重要健康信息所导致的意外情况，本机构不承担相关责任。本人已阅读并理解夏令营行为准则，并同意确保学员遵守。
              </div>
              <label className="flex items-start gap-2.5 text-[13px] text-white cursor-pointer mb-3">
                <input type="checkbox" name="consentLiability" required className="accent-[#C9A84C] mt-1 shrink-0" />
                <span>本人已充分阅读并理解上述责任豁免声明，自愿参加本夏令营活动，同意遵守所有规程及行为准则。<span className="text-[#e74c3c]">*</span></span>
              </label>
              <label className="flex items-start gap-2.5 text-[13px] text-white cursor-pointer">
                <input type="checkbox" name="consentTruth" required className="accent-[#C9A84C] mt-1 shrink-0" />
                <span>本人确认，本表单中填写的所有信息（包括健康、医疗及联系信息）真实、准确、完整，如有变更将及时通知主办方。<span className="text-[#e74c3c]">*</span></span>
              </label>
            </div>

            <div className="bg-[#c9a84c0a] border border-[#c9a84c40] rounded p-5 mb-4">
              <div className="text-[12px] tracking-[2px] text-[#C9A84C] uppercase mb-2.5 font-bold">🔒 隐私保护声明</div>
              <div className="text-[12px] text-[#aaa] leading-[1.8] mb-3.5">
                您所填写的所有个人及医疗信息将严格保密，仅供 ALT Hollywood Dream Star / THE GRDEN 工作人员在营期安全管理及紧急情况处理中使用，不会向第三方披露，除非法律要求或紧急医疗情况所需。
              </div>
              <label className="flex items-start gap-2.5 text-[13px] text-white cursor-pointer">
                <input type="checkbox" name="consentPrivacy" required className="accent-[#C9A84C] mt-1 shrink-0" />
                <span>本人已阅读隐私保护声明，同意按上述方式使用学员个人及医疗信息。<span className="text-[#e74c3c]">*</span></span>
              </label>
            </div>

            {/* Signature */}
            <div className="bg-[#1A1A1A] border border-[#c9a84c40] rounded-md p-6 sm:p-9 mt-6">
              <div className="text-[16px] font-bold text-[#C9A84C] mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-[#8B6914] after:to-transparent">
                六、家长 / 监护人签名确认
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">签名（打印全名）<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="signatureName" required placeholder="请输入您的全名作为电子签名" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">日期<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="date" name="signatureDate" required className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full [color-scheme:dark]" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[12px] tracking-[1.5px] text-[#C9A84C] uppercase font-medium">与学员关系<span className="text-[#e74c3c] ml-1">*</span></label>
                  <input type="text" name="signatureRelation" required placeholder="如：母亲 / 父亲 / 法定监护人" className="bg-white/5 border border-[#c9a84c4d] rounded-sm text-white text-[14px] p-3 focus:border-[#C9A84C] focus:bg-[#c9a84c0f] outline-none transition-all w-full" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full p-4.5 bg-gradient-to-br from-[#8B6914] via-[#C9A84C] to-[#F0C45A] border-none rounded-sm font-['Bebas_Neue'] text-[22px] tracking-[5px] text-black cursor-pointer transition-all mt-2 relative overflow-hidden hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(201,168,76,0.3)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
              {isSubmitting ? "正在提交..." : "🎬 提交报名表"}
            </button>

          </form>
        )}

      </div>

      {/* Contact Footer */}
      <div className="text-center py-8 px-5 bg-[#1A1A1A] border-t border-[#c9a84c33] mt-10">
        <div className="font-['Bebas_Neue'] text-[clamp(20px,4vw,28px)] tracking-[3px] text-[#C9A84C] mb-2">
          626-382-8849 ｜ 323-918-6688
        </div>
        <div className="text-[13px] text-[#888]">
          <a href="http://www.althollywood.com" className="text-[#C9A84C] no-underline hover:underline">www.althollywood.com</a>
          &nbsp;·&nbsp;
          <a href="mailto:altdreamstar@gmail.com" className="text-[#C9A84C] no-underline hover:underline">altdreamstar@gmail.com</a>
        </div>
        <div className="text-[11px] text-[#444] mt-4 leading-relaxed">
          © 2026 ALT Hollywood Dream Star · THE GRDEN · 好莱坞童星机构<br/>
          年龄要求：6–17 岁 · 夏令营时间：每日 10:00 AM – 4:00 PM
        </div>
      </div>

    </div>
  );
}
