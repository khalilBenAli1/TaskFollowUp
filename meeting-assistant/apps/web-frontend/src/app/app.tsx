import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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
