
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#ecf0fa] to-[#ddeaff] flex flex-col items-center justify-center px-4 py-20 font-sans">
      <div className="max-w-2xl w-full text-center space-y-8 py-10">
        <h1 className="text-4xl font-extrabold text-risolto-blue mb-4 leading-tight">
          Welcome to <span className="inline-block text-blue-700">Risolto</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-4">
          <b>Risolto</b> is a modern B2B invoice processing app prototype designed to streamline the way teams handle and approve invoices. 
          With advanced workflow automation, real-time analytics, and team management tools, Risolto helps organizations save time, reduce errors, and gain full visibility into their AP processes.
        </p>
        <ul className="text-left text-base md:text-lg mb-6 mx-auto max-w-xl list-disc pl-6 text-gray-800 space-y-3">
          <li><b>Upload & Extract:</b> Drag and drop invoices, with instant data extraction.</li>
          <li><b>Automated Approval Chains:</b> Set rules that assign reviewers, delegates, and approvers automatically.</li>
          <li><b>Workflow Visibility:</b> See the complete approval timeline for every invoice.</li>
          <li><b>Team Management:</b> Assign roles, monitor performance, and get insights on your AP team.</li>
          <li><b>Secure & Flexible:</b> Built on enterprise-grade technology with real-time updates and role-based access.</li>
        </ul>
        <div>
          <Button asChild size="lg" className="text-lg px-8 py-4 rounded-full">
            <a href="/dashboard">
              🚀 Try the Demo
            </a>
          </Button>
        </div>
        <p className="mt-6 text-xs text-gray-400">
          Built with React, Supabase, shadcn/ui, Tailwind CSS.<br/> Not connected to real payment or production data.
        </p>
      </div>
    </div>
  );
}
