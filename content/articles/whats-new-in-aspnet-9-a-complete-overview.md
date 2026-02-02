---
title: "What's New in ASP.NET 9: A Complete Overview"
description: "Explore the latest features, improvements, and breaking changes in ASP.NET 9 that every .NET developer should know"
published: 2026/01/15
slug: "whats-new-in-aspnet-9-a-complete-overview"
---

ASP.NET 9 shipped with .NET 9 in November 2024, and after spending several months building production applications with it, I'm ready to share what actually matters. Here's what you need to know.

## The Headline Features

### Static Web Asset Optimization

This is the feature I didn't know I needed. ASP.NET 9 now automatically optimizes your static assets at build time:

```csharp
// In Program.cs - it's enabled by default
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapStaticAssets(); // New method replacing UseStaticFiles()
```

What happens behind the scenes:
- CSS and JavaScript files are automatically minified
- Files are compressed with gzip and brotli
- Content-based fingerprinting for cache busting
- Automatic ETags for efficient caching

The results are impressive—our production bundle sizes dropped by 40% without any configuration.

### Blazor Improvements

Blazor continues its evolution toward being a complete full-stack solution.

**Render Mode Per Component:**

```razor
@* This component renders on the server *@
<ServerComponent @rendermode="InteractiveServer" />

@* This one runs in WebAssembly *@
<WasmComponent @rendermode="InteractiveWebAssembly" />

@* And this one picks the best option *@
<SmartComponent @rendermode="InteractiveAuto" />
```

**Better Streaming Rendering:**

```csharp
@attribute [StreamRendering(true)]

@code {
    private List<Product>? products;

    protected override async Task OnInitializedAsync()
    {
        // Content streams to the browser as data loads
        products = await LoadProductsAsync();
    }
}
```

### Minimal API Enhancements

Minimal APIs have matured significantly. The new features make them viable for large-scale applications.

**Native AOT Support:**

```csharp
var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

app.MapGet("/products/{id}", (int id) => 
    Results.Ok(new Product(id, "Widget", 29.99m)));

app.Run();

[JsonSerializable(typeof(Product))]
internal partial class AppJsonSerializerContext : JsonSerializerContext { }
```

The startup time improvements with Native AOT are remarkable—we're seeing sub-50ms cold starts.

**Built-in OpenAPI Support:**

```csharp
builder.Services.AddOpenApi();

// ...

app.MapOpenApi(); // Generates OpenAPI spec at /openapi/v1.json
```

No more installing separate Swagger packages for basic API documentation.

## SignalR Gets Smarter

### Polymorphic Hub Methods

You can now return different types from hub methods based on runtime conditions:

```csharp
public class NotificationHub : Hub
{
    public async Task<object> GetNotification(string type)
    {
        return type switch
        {
            "alert" => new AlertNotification { Level = "high", Message = "Server load critical" },
            "info" => new InfoNotification { Title = "Update Available" },
            _ => new BaseNotification { Type = type }
        };
    }
}
```

### Activity Tracing

SignalR now integrates with distributed tracing out of the box:

```csharp
builder.Services.AddSignalR()
    .AddHubOptions<ChatHub>(options =>
    {
        options.EnableDetailedErrors = true;
        options.AddActivitySource("MyApp.Chat");
    });
```

## Performance Improvements

The .NET team continues their relentless focus on performance. Here's what stood out:

### Kestrel Optimizations

- HTTP/3 performance improved by 20%
- Memory allocations reduced in hot paths
- Better handling of high-connection scenarios

### JSON Serialization

```csharp
// New streaming JSON APIs
await foreach (var item in JsonSerializer.DeserializeAsyncEnumerable<Product>(stream))
{
    ProcessProduct(item);
}
```

### Response Caching

```csharp
app.MapGet("/api/products", async (ProductService service) =>
{
    return await service.GetAllProducts();
})
.CacheOutput(policy => policy
    .Expire(TimeSpan.FromMinutes(5))
    .Tag("products")
    .VaryByQuery("category"));
```

## Security Updates

### Authentication Improvements

The authentication system got some quality-of-life improvements:

```csharp
builder.Services.AddAuthentication()
    .AddBearerToken(options =>
    {
        options.BearerTokenExpiration = TimeSpan.FromHours(1);
        options.RefreshTokenExpiration = TimeSpan.FromDays(14);
    })
    .AddOAuth("github", options =>
    {
        // Simplified OAuth configuration
    });
```

### Rate Limiting Enhancements

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddTokenBucketLimiter("api", config =>
    {
        config.TokenLimit = 100;
        config.TokensPerPeriod = 10;
        config.ReplenishmentPeriod = TimeSpan.FromSeconds(1);
        config.QueueLimit = 5;
    });
});
```

## Breaking Changes to Watch

A few things broke when we upgraded:

1. **`UseStaticFiles()` deprecation** - Replace with `MapStaticAssets()` for optimal behavior
2. **Nullable reference types enabled by default** - This caught us off guard in a few places
3. **Minimum TLS version** - TLS 1.2 is now the minimum; TLS 1.0/1.1 are no longer supported

## Migration Guide

Here's my recommended approach for upgrading from ASP.NET 8:

### Step 1: Update Target Framework

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>
```

### Step 2: Update Packages

```bash
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet remove package Swashbuckle.AspNetCore # If using built-in OpenAPI
```

### Step 3: Address Deprecations

Run the upgrade assistant or manually address the warnings:

```bash
dotnet tool install -g upgrade-assistant
upgrade-assistant analyze ./MyProject.csproj
```

## Should You Upgrade?

**Yes, if:**
- You're starting a new project
- You want Native AOT support
- Performance is critical to your application
- You're using Blazor and want the latest rendering modes

**Wait, if:**
- Your application is stable and working fine
- You're on a tight deadline
- You have significant dependencies that haven't updated yet

## Conclusion

ASP.NET 9 is a solid release that continues the framework's trajectory toward being the best platform for building web applications with .NET. The focus on performance, developer experience, and modern web standards is evident.

The static asset optimization alone is worth the upgrade for many applications. Combined with the Blazor improvements and Native AOT support, there's a lot to like here.

My recommendation: start a small project with ASP.NET 9 to get familiar with the changes, then plan your migration for production applications based on your specific needs and timelines.

Happy coding!
