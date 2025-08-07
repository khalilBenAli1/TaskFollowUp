import { Card, CardContent } from "@/components/ui/card";
import { Routes, Route, Link } from "react-router-dom";
import Integrations from "../pages/Integrations";

function Home() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Meeting Assistant</h1>
          <p className="text-muted-foreground">
            Cool & professional UI powered by Tailwind + shadcn
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 bg-gray-200 p-4">
        <nav className="space-y-2">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/settings/integrations">Integrations</Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings/integrations" element={<Integrations />} />
        </Routes>
      </main>
    </div>
  );
}
