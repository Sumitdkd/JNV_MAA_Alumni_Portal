import React from 'react';
export default function StyledText({ text }) {
    if (!text) return null;

    // This regex finds all occurrences of @[Some Name]
    const mentionRegex = /@\[([^\]]+)\]/g;
    const parts = text.split(mentionRegex);

    return (
        <p className="text-on-surface mt-1 whitespace-pre-wrap">
            {parts.map((part, index) => {
                // Every odd-indexed part is a captured name from the regex
                if (index % 2 === 1) {
                    return (
                        <strong key={index} className="text-blue-600 font-semibold">
                            @{part}
                        </strong>
                    );
                } else {
                    // Even-indexed parts are the normal text
                    return part;
                }
            })}
        </p>
    );
}

