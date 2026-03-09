const GUEST_PROFILE_STORAGE_KEY = "lista-de-mercado:guest-profile";

export type GuestProfile = {
  guestName: string;
  hasCompletedWelcome: boolean;
};

export function loadGuestProfile(): GuestProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawProfile = window.localStorage.getItem(GUEST_PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return null;
  }

  try {
    const parsedProfile = JSON.parse(rawProfile) as Partial<GuestProfile>;

    return {
      guestName: parsedProfile.guestName ?? "",
      hasCompletedWelcome: Boolean(parsedProfile.hasCompletedWelcome),
    };
  } catch {
    window.localStorage.removeItem(GUEST_PROFILE_STORAGE_KEY);
    return null;
  }
}

export function saveGuestProfile(profile: GuestProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(GUEST_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
