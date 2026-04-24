// swift-tools-version: 5.10
import PackageDescription

let package = Package(
    name: "Azri",
    defaultLocalization: "ar",
    platforms: [
        .iOS(.v17),
        .watchOS(.v10),
        // Required so `swift test` on the macOS host (used by CI) targets a
        // deployment with modern URLSession async APIs such as
        // `URLSession.data(for:)` (macOS 12+).
        .macOS(.v13),
    ],
    products: [
        .library(name: "AzriShared", targets: ["AzriShared"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "AzriShared",
            path: "AzriShared",
            exclude: [],
            resources: []
        ),
        .testTarget(
            name: "AzriTests",
            dependencies: ["AzriShared"],
            path: "AzriTests"
        ),
    ]
)
