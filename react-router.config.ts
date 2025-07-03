import type { Config } from "@react-router/dev/config";

export default {
  ssr: false, // SPA mode
  async prerender() {
    return ["/", "/about", "/skills", "/projects", "/contact"];
  },
} satisfies Config;
