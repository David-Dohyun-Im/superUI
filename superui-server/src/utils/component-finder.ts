/**
 * Component finder utility for SuperUI API Server
 * Manages the component library and provides search functionality
 */

export interface ComponentInfo {
  componentName: string;
  displayName: string;
  packageName: string;
  importStatement: string;
  usage: string;
  description: string;
  category: string;
  tags: string[];
  library?: "shadcn-ui" | "shadcn-ai" | "shadcn-button" | "shadcn-text";
  installCommand?: string;
  documentationUrl?: string;
}

/**
 * Comprehensive component library
 * Based on shadcn/ui components
 */
const COMPONENT_LIBRARY: Record<string, ComponentInfo> = {
  // Form Components
  "button": {
    componentName: "button",
    displayName: "Button",
    packageName: "@radix-ui/react-button",
    importStatement: `import { Button } from "@/components/ui/button"`,
    usage: `<Button variant="default">Click me</Button>`,
    description: "A versatile button component with multiple variants and sizes",
    category: "form",
    tags: ["button", "click", "action", "primary", "secondary"]
  },
  "input": {
    componentName: "input",
    displayName: "Input",
    packageName: "@radix-ui/react-input",
    importStatement: `import { Input } from "@/components/ui/input"`,
    usage: `<Input placeholder="Enter text..." />`,
    description: "A text input component for user input",
    category: "form",
    tags: ["input", "text", "form", "field", "type"]
  },
  "textarea": {
    componentName: "textarea",
    displayName: "Textarea",
    packageName: "@radix-ui/react-textarea",
    importStatement: `import { Textarea } from "@/components/ui/textarea"`,
    usage: `<Textarea placeholder="Enter your message..." />`,
    description: "A multi-line text input component",
    category: "form",
    tags: ["textarea", "text", "multiline", "message", "comment"]
  },
  "select": {
    componentName: "select",
    displayName: "Select",
    packageName: "@radix-ui/react-select",
    importStatement: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`,
    usage: `<Select><SelectTrigger><SelectValue placeholder="Select option" /></SelectTrigger><SelectContent><SelectItem value="option1">Option 1</SelectItem></SelectContent></Select>`,
    description: "A dropdown select component",
    category: "form",
    tags: ["select", "dropdown", "option", "choice", "form"]
  },
  "checkbox": {
    componentName: "checkbox",
    displayName: "Checkbox",
    packageName: "@radix-ui/react-checkbox",
    importStatement: `import { Checkbox } from "@/components/ui/checkbox"`,
    usage: `<Checkbox />`,
    description: "A checkbox input component",
    category: "form",
    tags: ["checkbox", "check", "form", "boolean", "toggle"]
  },
  "radio": {
    componentName: "radio-group",
    displayName: "Radio Group",
    packageName: "@radix-ui/react-radio-group",
    importStatement: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    usage: `<RadioGroup><RadioGroupItem value="option1" />Option 1</RadioGroup>`,
    description: "A radio button group component",
    category: "form",
    tags: ["radio", "group", "choice", "form", "option"]
  },

  // Layout Components
  "card": {
    componentName: "card",
    displayName: "Card",
    packageName: "@radix-ui/react-card",
    importStatement: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"`,
    usage: `<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Content</CardContent></Card>`,
    description: "A flexible card component for content display",
    category: "layout",
    tags: ["card", "container", "content", "panel", "box"]
  },
  "sheet": {
    componentName: "sheet",
    displayName: "Sheet",
    packageName: "@radix-ui/react-dialog",
    importStatement: `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"`,
    usage: `<Sheet><SheetTrigger>Open</SheetTrigger><SheetContent><SheetHeader><SheetTitle>Title</SheetTitle></SheetHeader></SheetContent></Sheet>`,
    description: "A slide-out panel component",
    category: "layout",
    tags: ["sheet", "panel", "drawer", "slide", "overlay"]
  },
  "dialog": {
    componentName: "dialog",
    displayName: "Dialog",
    packageName: "@radix-ui/react-dialog",
    importStatement: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"`,
    usage: `<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader></DialogContent></Dialog>`,
    description: "A modal dialog component",
    category: "layout",
    tags: ["dialog", "modal", "popup", "overlay", "window"]
  },
  "popover": {
    componentName: "popover",
    displayName: "Popover",
    packageName: "@radix-ui/react-popover",
    importStatement: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`,
    usage: `<Popover><PopoverTrigger>Open</PopoverTrigger><PopoverContent>Content</PopoverContent></Popover>`,
    description: "A floating panel component",
    category: "layout",
    tags: ["popover", "tooltip", "floating", "panel", "hover"]
  },

  // Navigation Components
  "tabs": {
    componentName: "tabs",
    displayName: "Tabs",
    packageName: "@radix-ui/react-tabs",
    importStatement: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    usage: `<Tabs><TabsList><TabsTrigger value="tab1">Tab 1</TabsTrigger></TabsList><TabsContent value="tab1">Content</TabsContent></Tabs>`,
    description: "A tabbed interface component",
    category: "navigation",
    tags: ["tabs", "navigation", "menu", "switching", "panel"]
  },
  "accordion": {
    componentName: "accordion",
    displayName: "Accordion",
    packageName: "@radix-ui/react-accordion",
    importStatement: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"`,
    usage: `<Accordion><AccordionItem><AccordionTrigger>Title</AccordionTrigger><AccordionContent>Content</AccordionContent></AccordionItem></Accordion>`,
    description: "A collapsible content component",
    category: "navigation",
    tags: ["accordion", "collapse", "expand", "content", "faq"]
  },
  "breadcrumb": {
    componentName: "breadcrumb",
    displayName: "Breadcrumb",
    packageName: "@radix-ui/react-breadcrumb",
    importStatement: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"`,
    usage: `<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink>Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>`,
    description: "A navigation breadcrumb component",
    category: "navigation",
    tags: ["breadcrumb", "navigation", "path", "hierarchy", "location"]
  },

  // Data Display Components
  "table": {
    componentName: "table",
    displayName: "Table",
    packageName: "@radix-ui/react-table",
    importStatement: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`,
    usage: `<Table><TableHeader><TableRow><TableHead>Header</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Cell</TableCell></TableRow></TableBody></Table>`,
    description: "A data table component",
    category: "data",
    tags: ["table", "data", "grid", "rows", "columns"]
  },
  "badge": {
    componentName: "badge",
    displayName: "Badge",
    packageName: "@radix-ui/react-badge",
    importStatement: `import { Badge } from "@/components/ui/badge"`,
    usage: `<Badge variant="default">Badge</Badge>`,
    description: "A small status indicator component",
    category: "data",
    tags: ["badge", "label", "status", "indicator", "tag"]
  },
  "avatar": {
    componentName: "avatar",
    displayName: "Avatar",
    packageName: "@radix-ui/react-avatar",
    importStatement: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    usage: `<Avatar><AvatarImage src="/img.jpg" /><AvatarFallback>CN</AvatarFallback></Avatar>`,
    description: "A user profile image component",
    category: "data",
    tags: ["avatar", "profile", "image", "user", "picture"]
  },
  "progress": {
    componentName: "progress",
    displayName: "Progress",
    packageName: "@radix-ui/react-progress",
    importStatement: `import { Progress } from "@/components/ui/progress"`,
    usage: `<Progress value={33} />`,
    description: "A progress bar component",
    category: "data",
    tags: ["progress", "bar", "loading", "percent", "status"]
  },
  "skeleton": {
    componentName: "skeleton",
    displayName: "Skeleton",
    packageName: "@radix-ui/react-skeleton",
    importStatement: `import { Skeleton } from "@/components/ui/skeleton"`,
    usage: `<Skeleton className="h-4 w-[250px]" />`,
    description: "A loading skeleton component",
    category: "data",
    tags: ["skeleton", "loading", "placeholder", "shimmer", "wait"]
  },

  // Feedback Components
  "alert": {
    componentName: "alert",
    displayName: "Alert",
    packageName: "@radix-ui/react-alert",
    importStatement: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"`,
    usage: `<Alert><AlertTitle>Title</AlertTitle><AlertDescription>Description</AlertDescription></Alert>`,
    description: "An alert notification component",
    category: "feedback",
    tags: ["alert", "notification", "message", "warning", "info"]
  },
  "toast": {
    componentName: "toast",
    displayName: "Toast",
    packageName: "@radix-ui/react-toast",
    importStatement: `import { Toast, ToastAction, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast"`,
    usage: `<Toast><ToastTitle>Title</ToastTitle><ToastDescription>Description</ToastDescription><ToastAction>Action</ToastAction><ToastClose /></Toast>`,
    description: "A toast notification component",
    category: "feedback",
    tags: ["toast", "notification", "message", "popup", "temporary"]
  },
  "separator": {
    componentName: "separator",
    displayName: "Separator",
    packageName: "@radix-ui/react-separator",
    importStatement: `import { Separator } from "@/components/ui/separator"`,
    usage: `<Separator />`,
    description: "A visual separator component",
    category: "feedback",
    tags: ["separator", "divider", "line", "border", "split"]
  },

  // Additional Form Components
  "label": {
    componentName: "label",
    displayName: "Label",
    packageName: "@radix-ui/react-label",
    importStatement: `import { Label } from "@/components/ui/label"`,
    usage: `<Label htmlFor="email">Email</Label>`,
    description: "A form label component with accessibility support",
    category: "form",
    tags: ["label", "form", "text", "field", "accessibility"]
  },
  "form": {
    componentName: "form",
    displayName: "Form",
    packageName: "react-hook-form",
    importStatement: `import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"`,
    usage: `<Form {...form}><FormField control={form.control} name="username" render={({ field }) => (<FormItem><FormLabel>Username</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} /></Form>`,
    description: "Form component with React Hook Form integration",
    category: "form",
    tags: ["form", "validation", "react-hook-form", "input", "submit"]
  },
  "switch": {
    componentName: "switch",
    displayName: "Switch",
    packageName: "@radix-ui/react-switch",
    importStatement: `import { Switch } from "@/components/ui/switch"`,
    usage: `<Switch checked={enabled} onCheckedChange={setEnabled} />`,
    description: "A toggle switch component for binary choices",
    category: "form",
    tags: ["switch", "toggle", "boolean", "on", "off"]
  },
  "slider": {
    componentName: "slider",
    displayName: "Slider",
    packageName: "@radix-ui/react-slider",
    importStatement: `import { Slider } from "@/components/ui/slider"`,
    usage: `<Slider defaultValue={[50]} max={100} step={1} />`,
    description: "A slider input component for selecting values from a range",
    category: "form",
    tags: ["slider", "range", "input", "value", "adjust"]
  },
  "combobox": {
    componentName: "combobox",
    displayName: "Combobox",
    packageName: "@radix-ui/react-combobox",
    importStatement: `import { Combobox } from "@/components/ui/combobox"`,
    usage: `<Combobox value={value} onValueChange={setValue} />`,
    description: "A combobox component with search and autocomplete",
    category: "form",
    tags: ["combobox", "autocomplete", "search", "select", "dropdown"]
  },
  "toggle": {
    componentName: "toggle",
    displayName: "Toggle",
    packageName: "@radix-ui/react-toggle",
    importStatement: `import { Toggle } from "@/components/ui/toggle"`,
    usage: `<Toggle aria-label="Toggle italic"><Italic /></Toggle>`,
    description: "A toggle button component with pressed state",
    category: "form",
    tags: ["toggle", "button", "pressed", "state", "icon"]
  },
  "toggle-group": {
    componentName: "toggle-group",
    displayName: "Toggle Group",
    packageName: "@radix-ui/react-toggle-group",
    importStatement: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    usage: `<ToggleGroup type="single"><ToggleGroupItem value="a">A</ToggleGroupItem></ToggleGroup>`,
    description: "A group of toggle buttons for multiple or single selection",
    category: "form",
    tags: ["toggle", "group", "buttons", "selection", "multiple"]
  },
  "input-otp": {
    componentName: "input-otp",
    displayName: "Input OTP",
    packageName: "@radix-ui/react-input-otp",
    importStatement: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"`,
    usage: `<InputOTP maxLength={6}><InputOTPGroup><InputOTPSlot index={0} /></InputOTPGroup></InputOTP>`,
    description: "One-time password input component",
    category: "form",
    tags: ["otp", "password", "verification", "code", "security"]
  },

  // Additional Layout Components
  "collapsible": {
    componentName: "collapsible",
    displayName: "Collapsible",
    packageName: "@radix-ui/react-collapsible",
    importStatement: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"`,
    usage: `<Collapsible><CollapsibleTrigger>Toggle</CollapsibleTrigger><CollapsibleContent>Content</CollapsibleContent></Collapsible>`,
    description: "A collapsible container component",
    category: "layout",
    tags: ["collapsible", "collapse", "expand", "toggle", "content"]
  },
  "resizable": {
    componentName: "resizable",
    displayName: "Resizable",
    packageName: "react-resizable-panels",
    importStatement: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`,
    usage: `<ResizablePanelGroup direction="horizontal"><ResizablePanel>Panel 1</ResizablePanel><ResizableHandle /><ResizablePanel>Panel 2</ResizablePanel></ResizablePanelGroup>`,
    description: "Resizable panel layout component",
    category: "layout",
    tags: ["resizable", "panel", "layout", "split", "drag"]
  },
  "scroll-area": {
    componentName: "scroll-area",
    displayName: "Scroll Area",
    packageName: "@radix-ui/react-scroll-area",
    importStatement: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    usage: `<ScrollArea className="h-72 w-48"><div>Content</div></ScrollArea>`,
    description: "A custom styled scrollable area",
    category: "layout",
    tags: ["scroll", "overflow", "scrollbar", "content", "area"]
  },
  "aspect-ratio": {
    componentName: "aspect-ratio",
    displayName: "Aspect Ratio",
    packageName: "@radix-ui/react-aspect-ratio",
    importStatement: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    usage: `<AspectRatio ratio={16 / 9}><img src="image.jpg" /></AspectRatio>`,
    description: "A container that maintains aspect ratio",
    category: "layout",
    tags: ["aspect-ratio", "responsive", "image", "video", "ratio"]
  },

  // Additional Navigation Components
  "navigation-menu": {
    componentName: "navigation-menu",
    displayName: "Navigation Menu",
    packageName: "@radix-ui/react-navigation-menu",
    importStatement: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"`,
    usage: `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Item</NavigationMenuTrigger><NavigationMenuContent>Content</NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
    description: "A complex navigation menu with dropdowns",
    category: "navigation",
    tags: ["navigation", "menu", "dropdown", "nav", "header"]
  },
  "menubar": {
    componentName: "menubar",
    displayName: "Menubar",
    packageName: "@radix-ui/react-menubar",
    importStatement: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"`,
    usage: `<Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New</MenubarItem></MenubarContent></MenubarMenu></Menubar>`,
    description: "A menubar component like desktop applications",
    category: "navigation",
    tags: ["menubar", "menu", "desktop", "navigation", "toolbar"]
  },
  "command": {
    componentName: "command",
    displayName: "Command",
    packageName: "cmdk",
    importStatement: `import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"`,
    usage: `<Command><CommandInput placeholder="Search..." /><CommandList><CommandGroup><CommandItem>Item</CommandItem></CommandGroup></CommandList></Command>`,
    description: "A command palette component for keyboard-first navigation",
    category: "navigation",
    tags: ["command", "palette", "search", "keyboard", "cmdk"]
  },
  "context-menu": {
    componentName: "context-menu",
    displayName: "Context Menu",
    packageName: "@radix-ui/react-context-menu",
    importStatement: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"`,
    usage: `<ContextMenu><ContextMenuTrigger>Right click</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Item</ContextMenuItem></ContextMenuContent></ContextMenu>`,
    description: "A context menu triggered by right-click",
    category: "navigation",
    tags: ["context-menu", "right-click", "menu", "popup", "actions"]
  },
  "dropdown-menu": {
    componentName: "dropdown-menu",
    displayName: "Dropdown Menu",
    packageName: "@radix-ui/react-dropdown-menu",
    importStatement: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"`,
    usage: `<DropdownMenu><DropdownMenuTrigger>Open</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Item</DropdownMenuItem></DropdownMenuContent></DropdownMenu>`,
    description: "A dropdown menu component",
    category: "navigation",
    tags: ["dropdown", "menu", "actions", "popup", "select"]
  },
  "pagination": {
    componentName: "pagination",
    displayName: "Pagination",
    packageName: "@radix-ui/react-pagination",
    importStatement: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"`,
    usage: `<Pagination><PaginationContent><PaginationItem><PaginationPrevious /></PaginationItem></PaginationContent></Pagination>`,
    description: "A pagination component for navigating pages",
    category: "navigation",
    tags: ["pagination", "pages", "navigation", "next", "previous"]
  },

  // Additional Data Display Components
  "calendar": {
    componentName: "calendar",
    displayName: "Calendar",
    packageName: "react-day-picker",
    importStatement: `import { Calendar } from "@/components/ui/calendar"`,
    usage: `<Calendar mode="single" selected={date} onSelect={setDate} />`,
    description: "A calendar component for date selection",
    category: "data",
    tags: ["calendar", "date", "picker", "schedule", "time"]
  },
  "date-picker": {
    componentName: "date-picker",
    displayName: "Date Picker",
    packageName: "react-day-picker",
    importStatement: `import { DatePicker } from "@/components/ui/date-picker"`,
    usage: `<DatePicker date={date} setDate={setDate} />`,
    description: "A date picker component with calendar",
    category: "data",
    tags: ["date", "picker", "calendar", "input", "select"]
  },
  "hover-card": {
    componentName: "hover-card",
    displayName: "Hover Card",
    packageName: "@radix-ui/react-hover-card",
    importStatement: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"`,
    usage: `<HoverCard><HoverCardTrigger>Hover</HoverCardTrigger><HoverCardContent>Content</HoverCardContent></HoverCard>`,
    description: "A card that appears on hover",
    category: "data",
    tags: ["hover", "card", "tooltip", "popup", "preview"]
  },
  "carousel": {
    componentName: "carousel",
    displayName: "Carousel",
    packageName: "embla-carousel-react",
    importStatement: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"`,
    usage: `<Carousel><CarouselContent><CarouselItem>Item</CarouselItem></CarouselContent></Carousel>`,
    description: "A carousel component for sliding content",
    category: "data",
    tags: ["carousel", "slider", "images", "gallery", "slides"]
  },
  "tooltip": {
    componentName: "tooltip",
    displayName: "Tooltip",
    packageName: "@radix-ui/react-tooltip",
    importStatement: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`,
    usage: `<TooltipProvider><Tooltip><TooltipTrigger>Hover</TooltipTrigger><TooltipContent>Content</TooltipContent></Tooltip></TooltipProvider>`,
    description: "A tooltip component for hover information",
    category: "data",
    tags: ["tooltip", "hover", "info", "help", "hint"]
  },

  // Additional Feedback Components
  "sonner": {
    componentName: "sonner",
    displayName: "Sonner",
    packageName: "sonner",
    importStatement: `import { toast } from "sonner"`,
    usage: `toast("Event has been created")`,
    description: "An alternative toast notification component",
    category: "feedback",
    tags: ["toast", "notification", "sonner", "alert", "message"]
  },

  // AI Components (shadcn.io)
  "ai-actions": {
    componentName: "ai-actions",
    displayName: "AI Actions",
    description: "Interactive AI action buttons for React chat interfaces with tooltips and shadcn/ui styling",
    importStatement: `import { Actions, Action } from "@/components/ai/actions"`,
    usage: `<Actions><Action label="Copy">Copy</Action></Actions>`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "chat", "actions", "buttons", "interactive"],
    library: "shadcn-ai",
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json",
    documentationUrl: "https://www.shadcn.io/ai/actions"
  },
  "ai-branch": {
    componentName: "ai-branch",
    displayName: "AI Branch",
    description: "Branch between AI response variations like ChatGPT for exploring multiple answers",
    importStatement: `import { Branch } from "@/components/ai/branch"`,
    usage: `<Branch responses={responses} onSelect={handleSelect} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "branch", "variations", "chatgpt", "responses"],
    library: "shadcn-ai",
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json",
    documentationUrl: "https://www.shadcn.io/ai/branch"
  },
  "ai-code-block": {
    componentName: "ai-code-block",
    displayName: "AI Code Block",
    description: "Syntax-highlighted code blocks with copy buttons for AI responses",
    importStatement: `import { AICodeBlock } from "@/components/ai/code-block"`,
    usage: `<AICodeBlock code={code} language="typescript" />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "code", "syntax", "highlight", "copy"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/code-block"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-conversation": {
    componentName: "ai-conversation",
    displayName: "AI Conversation",
    description: "Auto-scrolling chat container for smooth AI conversations",
    importStatement: `import { AIConversation } from "@/components/ai/conversation"`,
    usage: `<AIConversation messages={messages} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "chat", "conversation", "scroll", "streaming"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/conversation"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-image": {
    componentName: "ai-image",
    displayName: "AI Image",
    description: "Display AI-generated images with loading states and error handling",
    importStatement: `import { AIImage } from "@/components/ai/image"`,
    usage: `<AIImage src={imageUrl} alt="Generated image" />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "image", "dalle", "midjourney", "generated"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/image"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-inline-citation": {
    componentName: "ai-inline-citation",
    displayName: "AI Inline Citation",
    description: "Inline citations with hover previews like Perplexity AI",
    importStatement: `import { AIInlineCitation } from "@/components/ai/inline-citation"`,
    usage: `<AIInlineCitation source={source} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "citation", "perplexity", "sources", "references"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/inline-citation"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-loader": {
    componentName: "ai-loader",
    displayName: "AI Loader",
    description: "Animated loader for AI streaming responses showing AI is thinking",
    importStatement: `import { AILoader } from "@/components/ai/loader"`,
    usage: `<AILoader />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "loader", "streaming", "thinking", "animation"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/loader"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-message": {
    componentName: "ai-message",
    displayName: "AI Message",
    description: "Chat messages with avatars distinguishing user from AI",
    importStatement: `import { AIMessage } from "@/components/ai/message"`,
    usage: `<AIMessage role="assistant" content="Hello!" />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "message", "chat", "avatar", "conversation"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/message"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-prompt-input": {
    componentName: "ai-prompt-input",
    displayName: "AI Prompt Input",
    description: "ChatGPT-style input with auto-resize and model selector",
    importStatement: `import { AIPromptInput } from "@/components/ai/prompt-input"`,
    usage: `<AIPromptInput onSubmit={handleSubmit} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "input", "prompt", "chatgpt", "textarea"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/prompt-input"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-reasoning": {
    componentName: "ai-reasoning",
    displayName: "AI Reasoning",
    description: "Show AI thinking process like Claude's thinking blocks",
    importStatement: `import { AIReasoning } from "@/components/ai/reasoning"`,
    usage: `<AIReasoning content={reasoning} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "reasoning", "thinking", "claude", "process"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/reasoning"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-response": {
    componentName: "ai-response",
    displayName: "AI Response",
    description: "Markdown renderer optimized for streaming AI responses",
    importStatement: `import { AIResponse } from "@/components/ai/response"`,
    usage: `<AIResponse content={markdown} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "response", "markdown", "streaming", "render"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/response"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-sources": {
    componentName: "ai-sources",
    displayName: "AI Sources",
    description: "Expandable source citations like Perplexity's used sources",
    importStatement: `import { AISources } from "@/components/ai/sources"`,
    usage: `<AISources sources={sources} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "sources", "citations", "perplexity", "references"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/sources"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-suggestion": {
    componentName: "ai-suggestion",
    displayName: "AI Suggestion",
    description: "Suggestion chips like ChatGPT's follow-up prompts",
    importStatement: `import { AISuggestion } from "@/components/ai/suggestion"`,
    usage: `<AISuggestion suggestions={suggestions} onSelect={handleSelect} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "suggestions", "chips", "chatgpt", "prompts"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/suggestion"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-task": {
    componentName: "ai-task",
    displayName: "AI Task",
    description: "Task lists showing AI's work progress like Claude Artifacts",
    importStatement: `import { AITask } from "@/components/ai/task"`,
    usage: `<AITask tasks={tasks} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "task", "progress", "claude", "artifacts"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/task"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-tool": {
    componentName: "ai-tool",
    displayName: "AI Tool",
    description: "Display AI function calls like OpenAI's tool use",
    importStatement: `import { AITool } from "@/components/ai/tool"`,
    usage: `<AITool tool={toolCall} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "tool", "function", "openai", "calls"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/tool"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},
  "ai-web-preview": {
    componentName: "ai-web-preview",
    displayName: "AI Web Preview",
    description: "Preview AI-generated websites like v0.dev's live viewer",
    importStatement: `import { AIWebPreview } from "@/components/ai/web-preview"`,
    usage: `<AIWebPreview url={generatedUrl} />`,
    packageName: "shadcn-ai",
    category: "ai",
    tags: ["ai", "preview", "website", "v0", "iframe"],
    library: "shadcn-ai",
    documentationUrl: "https://www.shadcn.io/ai/web-preview"
  ,
    installCommand: "npx shadcn@latest add https://www.shadcn.io/registry/ai.json"},

  // Advanced Button Components (shadcn.io)
  "glow-button": {
    componentName: "glow-button",
    displayName: "Glow Button",
    description: "Button with animated glow effect and neon styling",
    importStatement: `import { GlowButton } from "@/components/button/glow-button"`,
    usage: `<GlowButton>Click me</GlowButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "glow", "neon", "animated", "effect"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/glow-button"
  },
  "shimmer-button": {
    componentName: "shimmer-button",
    displayName: "Shimmer Button",
    description: "Button with shimmer animation effect",
    importStatement: `import { ShimmerButton } from "@/components/button/shimmer-button"`,
    usage: `<ShimmerButton>Click me</ShimmerButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "shimmer", "shine", "animated", "effect"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/shimmer-button"
  },
  "magnetic-button": {
    componentName: "magnetic-button",
    displayName: "Magnetic Button",
    description: "Button with magnetic hover effect that follows cursor",
    importStatement: `import { MagneticButton } from "@/components/button/magnetic-button"`,
    usage: `<MagneticButton>Click me</MagneticButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "magnetic", "hover", "cursor", "interactive"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/magnetic-button"
  },
  "pulse-button": {
    componentName: "pulse-button",
    displayName: "Pulse Button",
    description: "Button with pulsing animation effect",
    importStatement: `import { PulseButton } from "@/components/button/pulse-button"`,
    usage: `<PulseButton>Click me</PulseButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "pulse", "animation", "heartbeat", "effect"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/pulse-button"
  },
  "gradient-button": {
    componentName: "gradient-button",
    displayName: "Gradient Button",
    description: "Button with animated gradient background",
    importStatement: `import { GradientButton } from "@/components/button/gradient-button"`,
    usage: `<GradientButton>Click me</GradientButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "gradient", "colorful", "animated", "background"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/gradient-button"
  },
  "neon-button": {
    componentName: "neon-button",
    displayName: "Neon Button",
    description: "Button with neon glow effect",
    importStatement: `import { NeonButton } from "@/components/button/neon-button"`,
    usage: `<NeonButton>Click me</NeonButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "neon", "glow", "cyberpunk", "effect"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/neon-button"
  },
  "shine-button": {
    componentName: "shine-button",
    displayName: "Shine Button",
    description: "Button with shine sweep animation",
    importStatement: `import { ShineButton } from "@/components/button/shine-button"`,
    usage: `<ShineButton>Click me</ShineButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "shine", "sweep", "animated", "effect"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/shine-button"
  },
  "copy-button": {
    componentName: "copy-button",
    displayName: "Copy Button",
    description: "Button for copying to clipboard with visual feedback",
    importStatement: `import { CopyButton } from "@/components/button/copy-button"`,
    usage: `<CopyButton text="Copy this" />`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "copy", "clipboard", "feedback", "utility"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/copy"
  },
  "expanding-button": {
    componentName: "expanding-button",
    displayName: "Expanding Button",
    description: "Button that expands on hover",
    importStatement: `import { ExpandingButton } from "@/components/button/expanding-button"`,
    usage: `<ExpandingButton>Click me</ExpandingButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "expand", "hover", "animated", "growth"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/expanding-button"
  },
  "tilt-button": {
    componentName: "tilt-button",
    displayName: "Tilt Button",
    description: "Button with 3D tilt effect on hover",
    importStatement: `import { TiltButton } from "@/components/button/tilt-button"`,
    usage: `<TiltButton>Click me</TiltButton>`,
    packageName: "shadcn-button",
    category: "advanced-button",
    tags: ["button", "tilt", "3d", "hover", "perspective"],
    library: "shadcn-button",
    documentationUrl: "https://www.shadcn.io/button/tilt-button"
  },

  // Text Components (shadcn.io)
  "gradient-text": {
    componentName: "gradient-text",
    displayName: "Gradient Text",
    description: "Text with smooth flowing gradient colors",
    importStatement: `import { GradientText } from "@/components/text/gradient-text"`,
    usage: `<GradientText>Beautiful Text</GradientText>`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "gradient", "animated", "colorful", "typography"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/gradient-text"
  },
  "typing-text": {
    componentName: "typing-text",
    displayName: "Typing Text",
    description: "Typewriter effect with realistic typing animation",
    importStatement: `import { TypingText } from "@/components/text/typing-text"`,
    usage: `<TypingText text="Hello World" />`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "typing", "typewriter", "animated", "effect"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/typing-text"
  },
  "shimmering-text": {
    componentName: "shimmering-text",
    displayName: "Shimmering Text",
    description: "Text with smooth shimmer wave animation",
    importStatement: `import { ShimmeringText } from "@/components/text/shimmering-text"`,
    usage: `<ShimmeringText>Shimmer Text</ShimmeringText>`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "shimmer", "wave", "animated", "effect"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/shimmering-text"
  },
  "counting-number": {
    componentName: "counting-number",
    displayName: "Counting Number",
    description: "Animated counting number with spring animations",
    importStatement: `import { CountingNumber } from "@/components/text/counting-number"`,
    usage: `<CountingNumber value={1000} />`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "number", "counting", "animated", "spring"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/counting-number"
  },
  "sliding-number": {
    componentName: "sliding-number",
    displayName: "Sliding Number",
    description: "Number with digit-by-digit sliding animations",
    importStatement: `import { SlidingNumber } from "@/components/text/sliding-number"`,
    usage: `<SlidingNumber value={1234} />`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "number", "sliding", "animated", "counter"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/sliding-number"
  },
  "rolling-text": {
    componentName: "rolling-text",
    displayName: "Rolling Text",
    description: "3D rolling text with character reveals",
    importStatement: `import { RollingText } from "@/components/text/rolling-text"`,
    usage: `<RollingText text="Rolling" />`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "rolling", "3d", "animated", "reveal"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/rolling-text"
  },
  "rotating-text": {
    componentName: "rotating-text",
    displayName: "Rotating Text",
    description: "Text with smooth vertical rotation transitions",
    importStatement: `import { RotatingText } from "@/components/text/rotating-text"`,
    usage: `<RotatingText words={["Hello", "World"]} />`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "rotating", "animated", "transition", "cycle"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/rotating-text"
  },
  "splitting-text": {
    componentName: "splitting-text",
    displayName: "Splitting Text",
    description: "Text with staggered character, word, or line reveals",
    importStatement: `import { SplittingText } from "@/components/text/splitting-text"`,
    usage: `<SplittingText text="Split Text" />`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "splitting", "stagger", "animated", "reveal"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/splitting-text"
  },
  "highlight-text": {
    componentName: "highlight-text",
    displayName: "Highlight Text",
    description: "Text with smooth expanding background highlights",
    importStatement: `import { HighlightText } from "@/components/text/highlight-text"`,
    usage: `<HighlightText>Highlighted Text</HighlightText>`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "highlight", "background", "animated", "emphasis"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/highlight-text"
  },
  "writing-text": {
    componentName: "writing-text",
    displayName: "Writing Text",
    description: "Text with word-by-word reveal animation",
    importStatement: `import { WritingText } from "@/components/text/writing-text"`,
    usage: `<WritingText text="Writing Text" />`,
    packageName: "shadcn-text",
    category: "text",
    tags: ["text", "writing", "reveal", "animated", "progressive"],
    library: "shadcn-text",
    documentationUrl: "https://www.shadcn.io/text/writing-text"
  }
};

/**
 * Find component by search query
 * @param query - Search query string
 * @returns Component information or null if not found
 */
export function findComponent(query: string): ComponentInfo | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Direct match
  if (COMPONENT_LIBRARY[normalizedQuery]) {
    return COMPONENT_LIBRARY[normalizedQuery];
  }
  
  // Alias matching
  const aliases: Record<string, string> = {
    "btn": "button",
    "text": "input",
    "textfield": "input",
    "text area": "textarea",
    "text-area": "textarea",
    "dropdown": "select",
    "check": "checkbox",
    "check box": "checkbox",
    "radio button": "radio-group",
    "radiobutton": "radio-group",
    "container": "card",
    "panel": "card",
    "box": "card",
    "drawer": "sheet",
    "sidebar": "sheet",
    "modal": "dialog",
    "tooltip": "popover",
    "menu": "tabs",
    "nav": "tabs",
    "collapse": "accordion",
    "expand": "accordion",
    "navigation": "breadcrumb",
    "path": "breadcrumb",
    "data": "table",
    "grid": "table",
    "label": "badge",
    "tag": "badge",
    "status": "badge",
    "profile": "avatar",
    "user": "avatar",
    "image": "avatar",
    "loading": "progress",
    "percent": "progress",
    "bar": "progress",
    "wait": "skeleton",
    "placeholder": "skeleton",
    "shimmer": "skeleton",
    "notification": "alert",
    "message": "alert",
    "warning": "alert",
    "info": "alert",
    "popup": "toast",
    "temporary": "toast",
    "divider": "separator",
    "line": "separator",
    "border": "separator"
  };
  
  if (aliases[normalizedQuery]) {
    return COMPONENT_LIBRARY[aliases[normalizedQuery]];
  }
  
  // Tag-based search
  for (const [componentName, componentInfo] of Object.entries(COMPONENT_LIBRARY)) {
    if (componentInfo.tags.some(tag => tag.includes(normalizedQuery) || normalizedQuery.includes(tag))) {
      return componentInfo;
    }
  }
  
  // Partial match in component name
  for (const [componentName, componentInfo] of Object.entries(COMPONENT_LIBRARY)) {
    if (componentName.includes(normalizedQuery) || normalizedQuery.includes(componentName)) {
      return componentInfo;
    }
  }
  
  return null;
}

/**
 * Get all available components
 * @returns Array of all component information
 */
export function getAllComponents(): ComponentInfo[] {
  return Object.values(COMPONENT_LIBRARY);
}

/**
 * Get components by category
 * @param category - Component category
 * @returns Array of components in the category
 */
export function getComponentsByCategory(category: string): ComponentInfo[] {
  return Object.values(COMPONENT_LIBRARY).filter(component => component.category === category);
}

/**
 * Search components by text
 * @param searchText - Text to search for
 * @returns Array of matching components
 */
export function searchComponents(searchText: string): ComponentInfo[] {
  const normalizedSearch = searchText.toLowerCase().trim();
  
  return Object.values(COMPONENT_LIBRARY).filter(component => 
    component.componentName.includes(normalizedSearch) ||
    component.displayName.toLowerCase().includes(normalizedSearch) ||
    component.description.toLowerCase().includes(normalizedSearch) ||
    component.tags.some(tag => tag.includes(normalizedSearch))
  );
}

/**
 * Search components with ranking algorithm
 * Supports multi-stage matching with relevance scoring
 * @param query - Search query string
 * @param category - Optional category filter
 * @param limit - Maximum number of results to return
 * @returns Array of matching components sorted by relevance
 */
export function searchComponentsRanked(
  query: string,
  category?: string,
  limit = 10
): ComponentInfo[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  interface ScoredComponent {
    component: ComponentInfo;
    score: number;
  }
  
  const scoredComponents: ScoredComponent[] = [];
  
  // Filter by category if provided
  const componentsToSearch = category
    ? Object.values(COMPONENT_LIBRARY).filter(c => c.category === category)
    : Object.values(COMPONENT_LIBRARY);
  
  for (const component of componentsToSearch) {
    let score = 0;
    
    // 1. Exact match on component name (highest priority)
    if (component.componentName === normalizedQuery) {
      score += 100;
    }
    // 2. Exact match on display name
    else if (component.displayName.toLowerCase() === normalizedQuery) {
      score += 90;
    }
    // 3. Component name starts with query
    else if (component.componentName.startsWith(normalizedQuery)) {
      score += 80;
    }
    // 4. Display name starts with query
    else if (component.displayName.toLowerCase().startsWith(normalizedQuery)) {
      score += 70;
    }
    // 5. Component name contains query
    else if (component.componentName.includes(normalizedQuery)) {
      score += 60;
    }
    // 6. Display name contains query
    else if (component.displayName.toLowerCase().includes(normalizedQuery)) {
      score += 50;
    }
    // 7. Exact tag match
    else if (component.tags.some(tag => tag === normalizedQuery)) {
      score += 40;
    }
    // 8. Tag contains query
    else if (component.tags.some(tag => tag.includes(normalizedQuery))) {
      score += 30;
    }
    // 9. Description contains query
    else if (component.description.toLowerCase().includes(normalizedQuery)) {
      score += 20;
    }
    
    // Bonus: Multiple word matches in description
    const queryWords = normalizedQuery.split(/\s+/);
    if (queryWords.length > 1) {
      const descriptionLower = component.description.toLowerCase();
      const matchedWords = queryWords.filter(word => 
        descriptionLower.includes(word)
      ).length;
      score += matchedWords * 5;
    }
    
    // Only include components with non-zero score
    if (score > 0) {
      scoredComponents.push({ component, score });
    }
  }
  
  // Sort by score (descending) and return top N
  return scoredComponents
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(sc => sc.component);
}

/**
 * Get component by exact name
 * @param componentName - Exact component name
 * @returns Component information or null if not found
 */
export function getComponentByName(componentName: string): ComponentInfo | null {
  return COMPONENT_LIBRARY[componentName] || null;
}
