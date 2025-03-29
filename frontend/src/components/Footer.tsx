// components/Footer.tsx
export default function Footer() {
    return (
        <footer className="mt-12 border-t pt-6 pb-4 text-sm text-gray-500">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-center md:text-left">
                    © 2025 <span className="font-semibold">AIgua</span> 💧 — All rights reserved.
                </p>
                <div className="flex gap-4">
                    <a href="/terms" className="hover:underline transition">
                        Terms of Use
                    </a>
                    <a href="/privacy" className="hover:underline transition">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}
