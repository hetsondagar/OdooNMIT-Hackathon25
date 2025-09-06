import { GlassCard } from "../ui/glass-card";
import { PremiumButton } from "../ui/premium-button";
import { useNavigate } from 'react-router-dom';

interface PleaseLoginProps {
  message?: string; // optional prop
}

function PleaseLogin({ message = "Please Login First" }: PleaseLoginProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
      <GlassCard className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">
          {message}
        </h2>
        <PremiumButton
          variant="eco"
          onClick={() => navigate("/login")}
        >
          Sign In
        </PremiumButton>
      </GlassCard>
    </div>
  );
}

export default PleaseLogin;
