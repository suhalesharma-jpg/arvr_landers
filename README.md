# 🏛️ AR Smart Guide

### Transforming Monument Visits into Interactive Learning Experiences

------------------------------------------------------------------------

<p align="center">
  <b>
    An Augmented Reality mobile application that brings monuments and museum exhibits to life through real-time image recognition and contextual overlays.
  </b>
</p>

<p align="center">
  🌐 Live Site:  
  <a href="https://suhalesharma-jpg.github.io/arvr_landers/" target="_blank">
    https://suhalesharma-jpg.github.io/arvr_landers/
  </a>
</p>


------------------------------------------------------------------------

## 🚀 Project Vision

AR Smart Guide is designed to redefine how visitors experience
historical and cultural sites.\
Instead of passively viewing structures, users actively explore their
meaning, purpose, and significance through immersive Augmented Reality.

------------------------------------------------------------------------

## 🎯 The Problem

Traditional monument visits often suffer from:

-   Limited availability of tour guides\
-   Static and unengaging information boards\
-   Long, linear audio guides\
-   Lack of personalization and interactivity

Visitors frequently see the structure --- but miss the story behind it.

------------------------------------------------------------------------

## 💡 The Solution

AR Smart Guide enables users to:

1.  Open the mobile application\
2.  Point their camera at a monument or exhibit\
3.  Instantly receive contextual AR-based explanations

The application overlays:

-   📜 Why it was built\
-   🏛 Historical and cultural importance\
-   ✨ Unique architectural features\
-   🔊 Optional audio narration

The focus is not just visualization --- but **meaningful
interpretation**.

------------------------------------------------------------------------

## 🏗️ System Architecture

User\
↓\
Mobile Camera Feed\
↓\
AR Engine (AR Foundation + ARCore)\
↓\
Image Recognition Module\
↓\
Local Content Database\
↓\
AR Overlay Renderer (UI + Audio)

------------------------------------------------------------------------

## ⚙️ Technology Stack

  Layer          Technology
  -------------- ----------------------------
  Engine         Unity
  AR Framework   AR Foundation
  AR Support     ARCore
  Language       C#
  UI System      Unity Canvas + TextMeshPro
  Recognition    Image-Based Tracking

------------------------------------------------------------------------

## 🔍 How It Works

-   The AR session initializes upon app launch.\
-   The camera continuously scans the environment.\
-   The system compares frames with a reference image library.\
-   When a match is detected:
    -   Tracking becomes active\
    -   Corresponding structured data is loaded\
    -   AR overlay is rendered dynamically\
-   The user interacts with the information panel.

------------------------------------------------------------------------

## ✨ Core Features

✔ Real-time monument detection\
✔ Context-aware information display\
✔ Structured explanation panels\
✔ Offline-first design\
✔ Audio narration support\
✔ Scalable modular architecture

------------------------------------------------------------------------

## 📦 Offline-First Design

All monument data, reference images, and audio files are stored locally
within the application.

This ensures: - No dependency on constant internet\
- Faster response time\
- Reliable performance in remote locations

------------------------------------------------------------------------

## 🚧 Technical Challenges

-   Maintaining stable tracking under varied lighting conditions\
-   Preventing UI clutter in AR view\
-   Ensuring performance on mid-range Android devices\
-   Structuring scalable content architecture

------------------------------------------------------------------------

## 📈 Future Enhancements

-   🤖 AI-powered conversational guide\
-   🌍 Multi-language support\
-   🏰 3D historical reconstruction\
-   ☁️ Cloud-based content updates\
-   📊 Visitor interaction analytics

------------------------------------------------------------------------

## 🎓 Impact

AR Smart Guide contributes to:

-   Smart tourism initiatives\
-   Digital heritage preservation\
-   Immersive educational systems\
-   Practical computer vision implementation

------------------------------------------------------------------------

## 🧠 Engineering Perspective

This project integrates:

-   Computer Vision\
-   Augmented Reality\
-   Mobile UI/UX Design\
-   Modular Software Architecture

It demonstrates the practical application of AR in real-world
educational and cultural domains.

------------------------------------------------------------------------

## 📌 Final Summary

> AR Smart Guide is a mobile-based augmented reality system that
> enhances monument and museum exploration by detecting structures
> through image recognition and delivering structured, meaningful
> contextual information in real time.
