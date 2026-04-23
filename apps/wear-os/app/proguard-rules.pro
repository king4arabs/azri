# Keep kotlinx.serialization generated $$serializer classes.
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keepclassmembers class ai.azri.wear.** {
    *** Companion;
}
-keepclasseswithmembers class ai.azri.wear.** {
    kotlinx.serialization.KSerializer serializer(...);
}
