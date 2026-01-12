
export type ServiceCategory = 'hair' | 'beard' | 'specials' | 'combo' | 'promotion';

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  category: ServiceCategory;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  selectedServices: string[];
  selectedBarber: string | null;
  selectedDate: string;
  selectedTime: string | null;
  customerName: string;
  customerPhone: string;
}

export enum BookingStep {
  SERVICES = 1,
  BARBER = 2,
  DATETIME = 3,
  DETAILS = 4,
  CONFIRMATION = 5
}
