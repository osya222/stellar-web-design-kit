
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublicOfferContent from "@/components/legal/PublicOfferContent";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

const PublicOffer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-slate-50">
        <div className="container-custom py-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
            <Tabs defaultValue="offer" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="offer" className="flex-1">Публичная оферта</TabsTrigger>
                <TabsTrigger value="privacy" className="flex-1">Политика конфиденциальности</TabsTrigger>
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
