import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

export function render(url: string, res: any): void {
    const stream = renderToPipeableStream(<App />, {
        onShellReady() {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            stream.pipe(res);
        },
        onError(err) {
            console.error('Error during rendering:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    });
}
