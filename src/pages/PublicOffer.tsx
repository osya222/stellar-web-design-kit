
import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublicOfferContent from "@/components/legal/PublicOfferContent";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { useLocation, useNavigate } from "react-router-dom";

const PublicOffer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPrivacyPath = location.pathname === "/privacy-policy";
  const activeTab = isPrivacyPath ? "privacy" : "offer";
  
  useEffect(() => {
    // Прокрутка страницы вверх при загрузке
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const handleTabChange = (value: string) => {
    if (value === "privacy" && !isPrivacyPath) {
      navigate("/privacy-policy");
    } else if (value === "offer" && isPrivacyPath) {
      navigate("/public-offer");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom py-12">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-4xl mx-auto">
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="w-full mb-6 bg-gray-50 p-1 rounded-lg">
                <TabsTrigger 
                  value="offer" 
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all text-gray-700 py-3"
                >
                  Публичная оферта
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all text-gray-700 py-3"
                >
                  Политика конфиденциальности
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="offer">
                <PublicOfferContent />
              </TabsContent>
              
              <TabsContent value="privacy" className="space-y-6">
                <PrivacyPolicyContent />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicOffer;
