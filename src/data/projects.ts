export type Project = {
    id: number;
    title: string;
    type: string;
    description: string;
    tech: string[];
    links: { label: string; url: string }[];
    images: string[];
};

export const projectsData: Project[] = [
    {
        id: 1,
        title: 'Patient Record Viewer',
        type: "(2024) Full-Stack (Healthcare Tech)",
        tech: ["Java", "MySQL", "Vue.js 3", "PrimeVue", "TypeScript", "RabbitMQ"],
        images: ['/assets/RecordViewer1.png'], // Keep existing image
        links: [
            { label: "View Wiki", url: "https://wiki.voror.co.uk/index.php?title=Record_Viewer" }
        ],
        description: `A high-impact clinical tool designed to optimize the "Cost of a Click" for healthcare professionals. This system provides insight into 38 million patient records across 850 GP practices.

I served as the Lead Developer, handling the full stack from high-throughput Java ingestion pipelines to the Vue.js frontend. The tool simplifies the user journey for clinicians, projected to save the sector £10 million annually in administrative time.

Key contributions included the full front-end design, implementing HSTS security filters for patient data compliance and giving both internal and external demos.`
    },
    {
        id: 2,
        title: 'Data Sharing Manager',
        type: "(2025) Legacy Migration (Angular to Vue)",
        tech: ["Vue.js 3", "Angular 8", "TypeScript", "Cypress", "Cucumber", "CI/CD"],
        images: ['/assets/RecordViewer1.png'], // **ACTION:** You need a screenshot for this, or re-use a generic dashboard image if NDA applies.
        links: [
            { label: "View Wiki", url: "https://wiki.voror.co.uk/index.php?title=Data_Sharing_Manager" }],
        description: `A comprehensive architectural overhaul of a legacy medical data system. The project involved migrating a complex Angular 8 codebase to a modern Vue 3 & TypeScript ecosystem to improve maintainability and performance.

I refactored over 50 complex components into a modular structure and introduced a robust End-to-End (E2E) testing suite using Cypress and Cucumber. This testing suite was integrated directly into the CI/CD pipeline, significantly reducing regression bugs in production.

This project tested my ability to navigate technical debt and modernize enterprise-scale applications without disrupting critical services.`
    },
    {
        id: 3,
        title: 'Portobello Driver Training',
        type: "(2024) Commercial Web Application",
        tech: ["Vue.js", "Docker", "Google Places API", "SEO", "PrimeVue"],
        images: [
            '/assets/PortobelloDriverTraining1.png',
            '/assets/PortobelloDriverTraining2.png',
            '/assets/PortobelloDriverTraining3.png'
        ],
        links: [
            { label: "Visit Site", url: "https://www.portobellodrivertraining.com" }
        ],
        description: `A bespoke booking and informational platform built for a commercial client. Unlike standard template sites, this was a custom solution containerized with Docker for easy deployment and scalability.

I integrated the Google Places API to dynamically pull reputation data and engineered the site structure for maximum SEO performance.

The results were immediate and measurable: the client saw a 100% year-on-year increase in customer inquiries following the launch, validating the technical strategy.`
    },
    {
        id: 4,
        title: 'Squishy / High-Fidelity Softbody',
        type: "(2025-2026) Systems Engineering (C#)",
        tech: ["Unity", "C#", "HLSL Shaders", "Mobile", "Memory Management", "URP"],
        images: ['/assets/LostBonds1.png'],
        links: [],
        description: `A high-performance 3D mobile game focusing on soft-body physics on constrained hardware. While game-engine based, this project requires heavy systems engineering and optimization.

I wrote custom HLSL vertex and fragment shaders to achieve specific visuals without the performance overhead of standard rendering paths. I also utilized Unity's Universal Render Pipeline (URP) workflow to maintain a steady 60 FPS on mobile devices.

The project requires strict memory budgeting and touch-input architecture, demonstrating proficiency in C# outside of standard web contexts. Set to release Q1 2026.`
    },
    {
        id: 5,
        title: 'Draw Dojo',
        type: "(2022) Frontend (React/Canvas)",
        tech: ["React", "TypeScript", "Complex State"],
        images: [
            '/assets/DrawDojo1.png',
            '/assets/DrawDojo2.png',
            '/assets/DrawDojo3.png'
        ],
        links: [
            { label: "View on GitHub", url: "https://github.com/artcollab/ui/tree/master" }
        ],
        description: `A collaborative social platform built with React and TypeScript. This project challenged me to manage complex, highly interactive state in a team environment.

Key features included a custom drawing engine allowing users to "remix" other users' posts—layering new canvas data on top of existing arrays. This required careful handling of data structures to ensure performant rendering in the browser.`
    }
];