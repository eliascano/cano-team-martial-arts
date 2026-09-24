import { supabase } from "./supabase";

export const getSession = () => supabase.auth.getSession();
export const onAuthStateChange = (callback) => supabase.auth.onAuthStateChange(callback);
export const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
export const signUp = (email, password, fullName) => supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
export const signInWithGoogle = () => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/mi-cuenta` } });
export const signOut = () => supabase.auth.signOut();
export const requestPasswordReset = (email) => supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
export const updatePassword = (password) => supabase.auth.updateUser({ password });
