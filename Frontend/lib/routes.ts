/** Type for route paths */
export type RoutePath = string;

/** Parameters for dynamic routes */
export interface DynamicRouteParams {
  id?: string;
  username?: string;
}

// ============================================================================
// Authentication Routes
// ============================================================================

export const authRoutes = {
  login: "/login",
  signup: "/signup",
} as const;

// ============================================================================
// Home & Main Routes
// ============================================================================

export const mainRoutes = {
  home: "/",
  dashboard: "/dashboard",
} as const;

// ============================================================================
// Profile Routes
// ============================================================================

export const profileRoutes = {
  profile: "/profile",
  settings: "/settings",
  subscribers: "/subscribers",
} as const;

// ============================================================================
// Video Routes
// ============================================================================

export const videoRoutes = {
  liked: "/liked",
  history: "/history",
  myContent: "/my-content",
  playlist: "/playlist",
} as const;

// ============================================================================
// Dynamic Route Helper Functions
// ============================================================================

/**
 * Generate a playlist route with the given ID
 * @param id - The playlist ID
 * @returns The full playlist route path
 */
export const getPlaylistRoute = (id: string): RoutePath => {
  if (!id) {
    console.warn("[routes] getPlaylistRoute called with empty id");
    return videoRoutes.playlist;
  }
  return `${videoRoutes.playlist}/${id}`;
};

/**
 * Generate a profile route with the given username
 * @param username - The username
 * @returns The full profile route path
 */
export const getProfileRoute = (username?: string): RoutePath => {
  if (!username) {
    return profileRoutes.profile;
  }
  return `${profileRoutes.profile}/${username}`;
};

/**
 * Generate a video route with the given video ID
 * @param videoId - The video ID
 * @returns The full video route path
 */
export const getVideoRoute = (videoId: string): RoutePath => {
  if (!videoId) {
    console.warn("[routes] getVideoRoute called with empty videoId");
    return videoRoutes.myContent;
  }
  return `/video/${videoId}`;
};

// ============================================================================
// Grouped Routes Object
// ============================================================================

/**
 * All routes organized by feature
 * Use this for centralized route management
 */
export const routes = {
  auth: authRoutes,
  main: mainRoutes,
  profile: profileRoutes,
  video: videoRoutes,
} as const;

// ============================================================================
// Route Type Exports
// ============================================================================

/** Type for all available route keys */
export type RouteKey = keyof typeof routes;

/** Type for all available routes */
export type AllRoutes =
  | (typeof authRoutes)[keyof typeof authRoutes]
  | (typeof mainRoutes)[keyof typeof mainRoutes]
  | (typeof profileRoutes)[keyof typeof profileRoutes]
  | (typeof videoRoutes)[keyof typeof videoRoutes];

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a path is an auth route
 * @param path - The path to check
 * @returns True if the path is an auth route
 */
export const isAuthRoute = (path: string): boolean => {
  return Object.values(authRoutes).includes(path as any);
};

/**
 * Check if a path is a protected route (requires authentication)
 * @param path - The path to check
 * @returns True if the path is protected
 */
export const isProtectedRoute = (path: string): boolean => {
  return !isAuthRoute(path) && path !== mainRoutes.home;
};

/**
 * Get the breadcrumb label for a route
 * @param path - The route path
 * @returns The breadcrumb label
 */
export const getRouteBreadcrumb = (path: string): string => {
  const breadcrumbMap: Record<string, string> = {
    [mainRoutes.home]: "Home",
    [mainRoutes.dashboard]: "Dashboard",
    [profileRoutes.profile]: "Profile",
    [profileRoutes.settings]: "Settings",
    [profileRoutes.subscribers]: "Subscribers",
    [videoRoutes.liked]: "Liked Videos",
    [videoRoutes.history]: "History",
    [videoRoutes.myContent]: "My Content",
    [videoRoutes.playlist]: "Playlists",
    [authRoutes.login]: "Login",
    [authRoutes.signup]: "Sign Up",
  };

  return breadcrumbMap[path] || "Page";
};
