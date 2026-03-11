export interface Track {
  slug: string;
  icon: string;
  color: string;
}

export const tracks: Track[] = [
  { slug: "foundations", icon: "cube", color: "#6366f1" },
  { slug: "local-models", icon: "server", color: "#8b5cf6" },
  { slug: "prompt-engineering", icon: "chat", color: "#ec4899" },
  { slug: "rag", icon: "search", color: "#f59e0b" },
  { slug: "fine-tuning", icon: "adjustments", color: "#10b981" },
  { slug: "agents", icon: "robot", color: "#3b82f6" },
];

export const trackMeta: Record<string, Record<string, { title: string; description: string }>> = {
  zh: {
    foundations: {
      title: "基础概念",
      description: "理解大语言模型的核心原理：Transformer、Tokenization、Embedding 等",
    },
    "local-models": {
      title: "本地模型",
      description: "在自己的机器上部署和运行开源模型：Ollama、llama.cpp、量化等",
    },
    "prompt-engineering": {
      title: "Prompt Engineering",
      description: "掌握与模型高效对话的技巧：提示词设计、Few-shot、Chain of Thought",
    },
    rag: {
      title: "RAG",
      description: "检索增强生成：向量数据库、Embedding 检索、知识库构建",
    },
    "fine-tuning": {
      title: "Fine-tuning",
      description: "模型微调：LoRA、数据集准备、训练流程与评估",
    },
    agents: {
      title: "Agents",
      description: "AI 智能体：工具调用、ReAct 模式、多步推理与自主执行",
    },
  },
  en: {
    foundations: {
      title: "Foundations",
      description: "Core concepts behind LLMs: Transformers, Tokenization, Embeddings and more",
    },
    "local-models": {
      title: "Local Models",
      description: "Deploy and run open-source models locally: Ollama, llama.cpp, quantization",
    },
    "prompt-engineering": {
      title: "Prompt Engineering",
      description: "Effective prompting techniques: prompt design, few-shot, chain of thought",
    },
    rag: {
      title: "RAG",
      description: "Retrieval-Augmented Generation: vector databases, embedding search, knowledge bases",
    },
    "fine-tuning": {
      title: "Fine-tuning",
      description: "Model fine-tuning: LoRA, dataset preparation, training pipelines and evaluation",
    },
    agents: {
      title: "Agents",
      description: "AI agents: tool use, ReAct pattern, multi-step reasoning and autonomous execution",
    },
  },
};
