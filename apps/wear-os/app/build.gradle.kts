plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "ai.azri.wear"
    compileSdk = 35

    defaultConfig {
        applicationId = "ai.azri.wear"
        minSdk = 30 // Wear OS 4 baseline (Samsung Galaxy Watch 4+)
        targetSdk = 35
        versionCode = 1
        versionName = "0.4.0"
        // RTL is on by default; explicit so review catches a regression.
        manifestPlaceholders["supportsRtl"] = "true"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.15"
    }
    packaging {
        resources.excludes += "/META-INF/{AL2.0,LGPL2.1}"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.compose.ui:ui:1.7.5")
    implementation("androidx.compose.foundation:foundation:1.7.5")
    implementation("androidx.compose.material:material:1.7.5")

    // Wear UI
    implementation("androidx.wear.compose:compose-material:1.4.0")
    implementation("androidx.wear.compose:compose-foundation:1.4.0")
    implementation("androidx.wear:wear:1.3.0")

    // Health Services — high-frequency biosignals on Wear OS.
    implementation("androidx.health:health-services-client:1.1.0-alpha04")

    // OkHttp for ingest uploader.
    implementation("com.squareup.okhttp3:okhttp:4.12.0")

    // Kotlinx serialization for the wire payload.
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")

    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1")
}
