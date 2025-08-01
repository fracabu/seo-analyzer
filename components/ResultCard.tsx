
import React from 'react';
import type { SeoMetric } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { InformationCircleIcon } from './icons/InformationCircleIcon';

interface ResultCardProps {
    title: string;
    data: SeoMetric;
}

const getStatusIcon = (status: SeoMetric['status']) => {
    switch (status) {
        case 'good':
            return <CheckCircleIcon className="w-6 h-6 text-green-400" />;
        case 'bad':
            return <XCircleIcon className="w-6 h-6 text-red-400" />;
        case 'warning':
        case 'neutral':
        default:
            return <InformationCircleIcon className="w-6 h-6 text-yellow-400" />;
    }
};

const renderDetails = (title: string, data: SeoMetric) => {
    switch (title) {
        case 'Title Tag':
            return <p className="text-slate-300 break-words">"{data.text}" ({data.length} chars)</p>;
        case 'Meta Description':
            return <p className="text-slate-300 break-words">"{data.text}" ({data.length} chars)</p>;
        case 'H1 Tags':
            return (
                 <div>
                    <p className="text-slate-300 mb-2">{data.count} found:</p>
                    <ul className="list-disc list-inside text-slate-400 text-sm">
                        {data.tags && data.tags.length > 0 ? (
                            data.tags.slice(0, 3).map((tag, i) => <li key={i} className="truncate">{tag}</li>)
                        ) : (
                            <li>No H1 tags found.</li>
                        )}
                        {data.tags && data.tags.length > 3 && <li className="text-slate-500">...and {data.tags.length - 3} more</li>}
                    </ul>
                </div>
            );
        case 'Image Alt Tags':
            return <p className="text-slate-300">{data.withAlt} of {data.total} images have alt text.</p>;
        case 'Page Word Count':
            return <p className="text-slate-300">{data.count?.toLocaleString()} words</p>;
        case 'Keyword Placement':
            return (
                 <ul className="space-y-1 text-slate-300 text-sm">
                    <li className="flex items-center gap-2">{data.inTitle ? '✅ In Title' : '❌ In Title'}</li>
                    <li className="flex items-center gap-2">{data.inDescription ? '✅ In Description' : '❌ In Description'}</li>
                    <li className="flex items-center gap-2">{data.inH1 ? '✅ In H1 Tag' : '❌ In H1 Tag'}</li>
                </ul>
            );
        default:
            return null;
    }
}


const ResultCard: React.FC<ResultCardProps> = ({ title, data }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-white">{title}</h3>
                {getStatusIcon(data.status)}
            </div>
            <div className="text-slate-300 text-base mb-4 flex-grow">
                {renderDetails(title, data)}
            </div>
            <p className="text-xs text-slate-400 mt-auto pt-4 border-t border-slate-700/50">{data.recommendation}</p>
        </div>
    );
};

export default ResultCard;