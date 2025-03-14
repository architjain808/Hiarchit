const angularCodeLines = [
  "import { Component, OnInit } from '@angular/core';",
  "import { FormBuilder, FormGroup, Validators } from '@angular/forms';",
  "import { HttpClient } from '@angular/common/http';",
  "import { Observable } from 'rxjs';",
  "import { map, catchError, tap } from 'rxjs/operators';",
  "",
  "@Component({",
  "  selector: 'app-portfolio',",
  "  templateUrl: './portfolio.component.html',",
  "  styleUrls: ['./portfolio.component.scss']",
  "})",
  "export class PortfolioComponent implements OnInit {",
  "  projects: Project[] = [];",
  "  contactForm: FormGroup;",
  "  isLoading = false;",
  "  submitted = false;",
  "",
  "  constructor(",
  "    private http: HttpClient,",
  "    private fb: FormBuilder",
  "  ) {}",
  "",
  "  ngOnInit(): void {",
  "    this.initForm();",
  "    this.loadProjects();",
  "  }",
  "",
  "  initForm(): void {",
  "    this.contactForm = this.fb.group({",
  "      name: ['', [Validators.required, Validators.minLength(2)]],",
  "      email: ['', [Validators.required, Validators.email]],",
  "      message: ['', [Validators.required, Validators.minLength(10)]]",
  "    });",
  "  }",
  "",
  "  loadProjects(): void {",
  "    this.isLoading = true;",
  "    this.getProjects().pipe(",
  "      tap(projects => {",
  "        this.projects = projects;",
  "        this.isLoading = false;",
  "      }),",
  "      catchError(error => {",
  "        console.error('Error loading projects', error);",
  "        this.isLoading = false;",
  "        return [];",
  "      })",
  "    ).subscribe();",
  "  }",
  "",
  "  getProjects(): Observable<Project[]> {",
  "    return this.http.get<Project[]>('/api/projects').pipe(",
  "      map(response => response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))",
  "    );",
  "  }",
  "",
  "  onSubmit(): void {",
  "    this.submitted = true;",
  "    ",
  "    if (this.contactForm.invalid) {",
  "      return;",
  "    }",
  "    ",
  "    this.isLoading = true;",
  "    this.http.post('/api/contact', this.contactForm.value).pipe(",
  "      tap(() => {",
  "        this.isLoading = false;",
  "        this.submitted = false;",
  "        this.contactForm.reset();",
  "        alert('Thank you for your message!');",
  "      }),",
  "      catchError(error => {",
  "        console.error('Error submitting form', error);",
  "        this.isLoading = false;",
  "        alert('There was an error sending your message. Please try again.');",
  "        return [];",
  "      })",
  "    ).subscribe();",
  "  }",
  "}",
  "",
  "interface Project {",
  "  id: number;",
  "  title: string;",
  "  description: string;",
  "  technologies: string[];",
  "  imageUrl: string;",
  "  githubUrl: string;",
  "  liveUrl: string;",
  "  date: string;",
  "}",
];

// Create background with typing effect
const codeBackground = document.getElementById("codeBackground");

// Create a grid of typing code elements
function createCodeGrid() {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const lineHeight = 21; // px
  const approximateLines = Math.ceil(windowHeight / lineHeight) + 5;
  const approximateColumns = Math.ceil(windowWidth / 800) + 1;

  codeBackground.innerHTML = "";

  for (let col = 0; col < approximateColumns; col++) {
    for (let line = 0; line < approximateLines; line++) {
      const codeLineElement = document.createElement("div");
      codeLineElement.className = "code-line";
      codeLineElement.setAttribute(
        "data-line",
        (line % angularCodeLines.length).toString()
      );
      codeLineElement.setAttribute("data-column", col.toString());
      codeLineElement.setAttribute(
        "data-delay",
        (line * 100 + col * 2000).toString()
      );
      codeLineElement.setAttribute("data-text", "");
      codeLineElement.style.marginLeft = col * 800 + "px";
      codeBackground.appendChild(codeLineElement);
    }
  }
}

// Initialize the code grid
createCodeGrid();

// Handle typing effect
const codeLines = document.querySelectorAll(".code-line");

function startTyping() {
  codeLines.forEach((line) => {
    const lineIndex = parseInt(line.getAttribute("data-line"));
    const delay = parseInt(line.getAttribute("data-delay"));
    const text = angularCodeLines[lineIndex];

    setTimeout(() => {
      typeText(line, text);
    }, delay);
  });
}

function typeText(element, text) {
  let index = 0;
  let currentText = "";

  function type() {
    if (index < text.length) {
      currentText += text.charAt(index);
      element.textContent = currentText;
      index++;
      setTimeout(type, Math.random() * 50 + 20); // Random typing speed
    } else {
      // Add slight pause before typing next line
      setTimeout(() => {
        // Reset and start again (infinite loop)
        element.textContent = "";
        index = 0;
        currentText = "";
        type();
      }, 3000);
    }
  }

  type();
}

// Start typing effect
startTyping();

// Handle window resize
window.addEventListener("resize", () => {
  createCodeGrid();
  startTyping();
});
