---
layout: base
permalink: /
---

  <section class="grid">
    <div class="lead">
      <h1>Start Solving Civic Challenges with the Civic Tech Toolkit</h1>
      <p >Are you...</p>
      <ul>
        <li>Hoping to solve problems in your community?</li>
        <li>Struggling to start or sustain your initiative?</li>
        <li>Looking for example projects to reference?</li>
      </ul>
      <p>Or maybe you have have an incredible amazing idea but you have no idea where to start?</p>
      <a role="button" class="primary" href="/get-started">Get Started</a>
      <a role="button" class="secondary" href="#get-started">Learn More</a>
    </div>
    <div>
    <img src="">
    </div>
  </section>

  <section id="get-started">
    <h2>How to start building your project</h2>
    <p class="lead">This resource is designed to help you create, develop, and implement impactful civic technology projects. Whether you're a seasoned practitioner or new to the field, this playbook offers structure for your project.</p>
    <div class="grid">
      <article class="card">
        <img src="">
        <h3>Core Values</h3>
        <p class="lead">Discover the core values and guiding principles that underpin effective civic tech projects.</p>
        <a href="/core-values">Establish principles to guide you</a>
      </article>
      <article class="card">
        <img src="">
        <h3>Ways of Working</h3>
        <p class="lead">Explore the invisible design activities that support and enhance your project throughout its lifecycle.</p>
        <a href="/ways-of-working">Learn how to build a team</a>
      </article>
      <article class="card">
        <img src="">
        <h3>Lifecycle of a Project</h3>
        <p class="lead">Follow our adapted double diamond approach to guide your project from initial concept to real-world impact.</p>
        <a href="/project-lifecycle">Discover the end-to-end cycle</a>
      </article>
    </div>
    <a role="button" class="primary" href="/get-started">Get Started</a>
  </section>
  <section>
    <h2>What the toolkit can do for you.</h2>
    <p class="lead">The toolkit provides guidance on how to pitch a project, manage a team, document your process and deliver outcomes.</p>
    <p>The volunteer tech space can be hard to navigate and we’re here to give you all the tools to help you reach your version of success. We encourage you to explore each section, adapt the guidance to your specific context, and contribute your own experiences and insights to the ever-growing field of civic technology. Let's build a better future for our communities, together!</p>
      <article class="card grid">
        <div>
          <h3>Case Studies</h3>
          <p class="lead">Explore projects created by the community for the community.</p>
          <a role="button" href="/case-studies">Learn from Past Projects</a>
        </div>
        <div>
          <h3>Recent updates</h3>
          {% assign sorted_resources = site.resources | sort: "date" | reverse %}
          {% for resource in sorted_resources limit:3 %}
          <div>
            <h4>{{ resource.title }}</h4>
            <p>{{ resource.excerpt }}</p>
            <a href="{{ resource.url }}">Learn more</a>
          </div>
          {% endfor %}
          <a href="/case-studies">See all case studies</a>
        </div>
      </article>
      <article class="card grid">
        <div>
          <h2>Tools & Resources</h2>
          <p class="lead">Your toolbox to documenting, building and executing your project.</p>
          <a href="/resources">Explore tools to help you build</a>
        </div>
        <div>
          <h3>Recent updates</h3>
          {% assign sorted_resources = site.resources | sort: "date" | reverse %}
          {% for resource in sorted_resources limit:3 %}
          <div>
            <h4>{{ resource.title }}</h4>
            <p>{{ resource.excerpt }}</p>
            <a href="{{ resource.url }}">Learn more</a>
          </div>
          {% endfor %}
          <a href="/case-studies">See all resources</a>
        </div>
      </article>
      <article class="card" style="text-align:center;">
        <h3>Contribute to the Toolkit</h3>
        <p class="lead">The toolkit operates as an open collaboration.<br/>
        If you'd like to define and support this resource you are welcome to join in on the effort.</p>
        <a role="button" href="/contribute">Get Involved</a>
      </article>
  </section>
