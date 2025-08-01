
export type AnalysisStatus = 'good' | 'bad' | 'warning' | 'neutral';

export interface SeoMetric {
    text?: string;
    length?: number;
    tags?: string[];
    count?: number;
    total?: number;
    withAlt?: number;
    withoutAlt?: number;
    inTitle?: boolean;
    inDescription?: boolean;
    inH1?: boolean;
    status: AnalysisStatus;
    recommendation: string;
}

export interface SeoAnalysisResult {
    title: SeoMetric & { text: string; length: number; };
    metaDescription: SeoMetric & { text: string; length: number; };
    h1Tags: SeoMetric & { tags: string[]; count: number; };
    images: SeoMetric & { total: number; withAlt: number; withoutAlt: number; };
    wordCount: SeoMetric & { count: number; };
    keywordAnalysis: SeoMetric & { inTitle: boolean; inDescription: boolean; inH1: boolean; };
}
