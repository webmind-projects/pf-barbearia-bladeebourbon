import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Share2, Facebook, Instagram } from 'lucide-react';

export const Contact: React.FC = () => {
  useEffect(() => {
    // Initialize Leaflet map
    const initMap = () => {
      // @ts-ignore
      if (typeof window.L === 'undefined' || document.getElementById('map')?._leaflet_id) return;

      // Coordinates for Porto Alegre - RS (Av. Bento Gonçalves region aprox)
      const lat = -30.0546;
      const lng = -51.1977;

      // @ts-ignore
      const map = window.L.map('map').setView([lat, lng], 15);

      // CartoDB Dark Matter tiles for the dark aesthetic
      // @ts-ignore
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Custom icon
      // @ts-ignore
      const icon = window.L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // @ts-ignore
      window.L.marker([lat, lng], { icon }).addTo(map)
        .bindPopup('<b>Blade & Bourbon</b><br>Av. Bento Gonçalves, 4583')
        .openPopup();
    };

    // Check if script is loaded, if not wait a bit
    // @ts-ignore
    if (window.L) {
      initMap();
    } else {
      const interval = setInterval(() => {
        // @ts-ignore
        if (window.L) {
          initMap();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section className="py-16 md:py-24 bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          
          {/* Contact Info Card */}
          <div className="bg-black border border-zinc-800 rounded-2xl md:rounded-[2rem] p-6 md:p-12 shadow-2xl flex flex-col justify-center h-full w-full overflow-hidden">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 md:mb-10">Contato</h2>
            
            <div className="space-y-6 md:space-y-8">
              {/* Telefone */}
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-gold-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Telefone:</h3>
                </div>
                <p className="text-zinc-400 text-base md:text-lg break-words leading-relaxed pl-1">
                  (51) 99999-9999 | (51) 3333-3333
                </p>
              </div>

              {/* Email */}
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-gold-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Email:</h3>
                </div>
                <p className="text-zinc-400 text-base md:text-lg break-all md:break-words pl-1">
                  contato@bladeandbourbon.com.br
                </p>
              </div>

              {/* Horários */}
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-gold-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Horários:</h3>
                </div>
                <p className="text-zinc-400 text-base md:text-lg break-words pl-1">
                  Ter - Sab : 09h às 19h
                </p>
              </div>

              {/* Redes Sociais */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-gold-500/20">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Redes Sociais:</h3>
                </div>
                <div className="flex gap-3 flex-wrap pl-1">
                  {/* Facebook - Blue */}
                  <a 
                    href="#" 
                    className="w-10 h-10 md:w-12 md:h-12 rounded bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity hover:scale-105"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                  </a>
                  
                  {/* Instagram - Purple/Gradient-ish */}
                  <a 
                    href="#" 
                    className="w-10 h-10 md:w-12 md:h-12 rounded bg-[#9333EA] flex items-center justify-center text-white hover:opacity-90 transition-opacity hover:scale-105"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                  </a>

                  {/* WhatsApp - Green */}
                  <a 
                    href="https://wa.me/5551999999999" 
                    className="w-10 h-10 md:w-12 md:h-12 rounded bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition-opacity hover:scale-105"
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Localização */}
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-gold-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Localização:</h3>
                </div>
                <p className="text-zinc-400 text-base md:text-lg break-words pl-1">
                  Av. Bento Gonçalves, 4583, POA-RS
                </p>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="relative h-[200px] min-h-[200px] md:h-auto md:min-h-[350px] rounded-2xl md:rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl bg-black w-full">
            <div id="map" className="absolute inset-0 z-0 h-full w-full"></div>
            {/* Inner shadow overlay for depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};