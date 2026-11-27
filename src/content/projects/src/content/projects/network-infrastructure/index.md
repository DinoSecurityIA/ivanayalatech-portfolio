---
title: "Network Infrastructure, Security & Remote Access"
summary: "Design and administration of a self-hosted network infrastructure using OPNsense, UniFi managed switching, DNS and DHCP services, WireGuard VPN access, firewall policies, and planned VLAN segmentation."
date: 2026-11-26
tags:
  - Networking
  - OPNsense
  - UniFi
  - WireGuard
  - Firewall
  - Network Security
draft: false
---

## Project Overview

Designed, implemented, and maintained an independent home network infrastructure to support virtualized servers, network services, secure remote connectivity, and infrastructure experimentation.

The environment uses a dedicated OPNsense firewall and managed UniFi switching infrastructure, with local DNS and DHCP services and WireGuard-based remote access.

The project provides practical experience in routing, firewall administration, network services, VPN configuration, managed switching, troubleshooting, configuration management, and network security planning.

The infrastructure also serves as the networking foundation for additional projects involving virtualization, containerized applications, centralized storage, monitoring, and cloud-connected services.

## Project Objectives

- Establish a dedicated firewall and routing platform.
- Deploy and manage switching infrastructure.
- Centralize DNS resolution and DHCP administration.
- Provide secure remote access to internal resources.
- Maintain reliable connectivity for virtualized services.
- Develop network segmentation using VLANs and firewall policies.
- Implement configuration backup and recovery procedures.
- Develop practical network troubleshooting and security administration skills.

---

## Technologies Used

- OPNsense
- UniFi managed switching
- UniFi Network Controller
- WireGuard
- Unbound DNS
- Dnsmasq DHCP
- VLANs and IEEE 802.1Q tagging
- IPv4 subnetting and routing
- Stateful firewall policies
- Linux networking tools
- Network configuration backups

---

## Network Architecture

### Physical Infrastructure

The network uses a dedicated Fitlet appliance running OPNsense as its primary firewall and router.

A UniFi 24-port PoE managed switch provides connectivity between the firewall, virtualization infrastructure, and other networked devices.

The primary network path is:

**ISP Connection → Optical Network Terminal → OPNsense Firewall → UniFi Managed Switch → Internal Devices and Proxmox Infrastructure**

A separate Linux system hosts the UniFi Network Controller, allowing centralized administration of the managed switching environment.

This design separates firewall and routing responsibilities from the virtualization workloads running on the Proxmox host.

### Firewall and Routing

OPNsense serves as the primary network gateway, providing:

- Routing between the local network and internet connection.
- Stateful traffic filtering.
- Firewall rule management.
- Network interface administration.
- VPN connectivity.
- DNS and DHCP service integration.
- The foundation for future inter-VLAN routing and security policies.

Running OPNsense on dedicated hardware allows the network gateway to operate independently of the primary virtualization server.

This separation is important because maintenance or failure of the Proxmox host does not inherently require shutting down the network gateway.

### Managed Switching

The UniFi managed switch provides connectivity between the network gateway and internal infrastructure.

The switching environment is administered through the UniFi Network Controller.

Management responsibilities include:

- Switch and interface configuration.
- Port assignment and configuration.
- Network and VLAN definitions.
- Tagged and untagged traffic planning.
- Connectivity troubleshooting.
- Preparation for network segmentation.

Managed switching also provides the flexibility to assign different networks to specific switch ports as the environment expands.

### DNS and DHCP Architecture

The environment uses local DNS and DHCP services to manage internal network connectivity.

Unbound on OPNsense provides DNS resolution, while Dnsmasq is used for DHCP administration and address reservations.

These services provide a centralized location for managing internal addressing and device connectivity.

DHCP reservations are especially useful for infrastructure systems that need predictable IP addresses, such as virtualization hosts and server workloads.

Local DNS management supports the longer-term goal of accessing internal systems through consistent hostnames rather than relying exclusively on numerical IP addresses.

---

## Implementation

### Dedicated Firewall Deployment

Installed and configured OPNsense on dedicated Fitlet hardware.

Established the WAN and LAN interfaces and configured the appliance to function as the primary network gateway.

Integrated the firewall with the managed switching environment and connected internal infrastructure through the established LAN.

Using a dedicated firewall appliance provided an opportunity to manage routing, firewall policies, and network services independently of the primary virtualization host.

### UniFi Switching Infrastructure

Deployed and configured a UniFi 24-port PoE managed switch as the central switching platform.

Established controller access and managed network configuration through the UniFi Network interface.

The managed switching platform supports the existing trusted network while providing the capability to introduce additional VLANs and isolated network segments.

### Local Network Services

Configured local DNS and DHCP services to support connected devices and infrastructure workloads.

Established predictable addressing for selected servers and applications using DHCP reservations.

Maintaining these services centrally makes it easier to manage infrastructure changes, troubleshoot name resolution, and associate network addresses with specific devices or workloads.

### WireGuard Remote Access

Configured WireGuard on the OPNsense firewall to provide encrypted remote connectivity to the internal network.

WireGuard establishes an encrypted tunnel between an authorized remote client and the home network.

This allows selected internal resources to be accessed from outside the local network without requiring those individual services to be directly published as public-facing websites.

Configured and tested WireGuard clients on multiple devices, including a Windows laptop and Steam Deck.

Validated remote connectivity to internal applications and network resources while away from the home network.

### VLAN and DMZ Preparation

Began implementing a segmented network architecture to support future separation between trusted devices and publicly accessible infrastructure.

Created VLAN definitions in OPNsense and matching network configurations in UniFi.

The planned design includes:

- A trusted network for personal devices and administrative access.
- A separate DMZ for selected infrastructure that may eventually support public-facing services.
- Firewall-controlled communication between network segments.
- Explicit policies restricting access from less-trusted environments to administrative systems.

Configured the DMZ interface and prepared a temporary firewall rule for controlled connectivity testing.

An unused managed switch port was identified for testing with a designated client.

Configuration backups were completed before continuing with changes that could affect network connectivity.

**Implementation status:** The VLAN definitions, DMZ interface, and initial test rule were configured. End-to-end DMZ connectivity, inter-VLAN isolation, and trusted LAN migration have not yet been validated.

This work was intentionally deferred while prioritizing the deployment of a cloud-hosted professional portfolio.

---

## Technical Decisions and Trade-offs

### Dedicated Firewall Hardware

Selected a dedicated OPNsense appliance rather than hosting the primary firewall as a virtual machine.

This decision keeps network gateway availability independent of Proxmox maintenance and virtual machine startup.

It also provides direct control over physical network interfaces and routing behavior.

The trade-off is an additional physical device to maintain, monitor, and protect against hardware failure.

### Managed Switching

Selected managed switching to provide centralized configuration, visibility, and support for VLAN-based network segmentation.

A basic unmanaged switch would provide connectivity but would not offer the same degree of control over tagged traffic and network assignments.

Managed switching introduces additional configuration complexity, particularly when coordinating VLAN interfaces across the firewall, switch, and connected hosts.

### WireGuard for Remote Access

Selected WireGuard for its encrypted tunnel functionality, relatively lightweight architecture, and compatibility with the devices used in the environment.

The VPN allows remote devices to communicate with approved internal resources through the home firewall.

This approach is preferable to indiscriminately exposing internal administration interfaces or media services to the public internet.

However, VPN access must still be managed carefully through peer configuration, credential protection, firewall policies, and network access restrictions.

### Centralized Network Services

Centralized DNS and DHCP administration on the firewall platform to simplify infrastructure management.

This approach reduces the need to configure network services independently on every client.

The trade-off is greater dependence on the firewall appliance for essential network services.

### Incremental Network Segmentation

Selected an incremental VLAN deployment approach rather than immediately migrating the entire existing LAN.

This allowed new interfaces, switch configurations, and firewall rules to be prepared without disrupting the operational virtualization and storage environment.

The approach also provides an opportunity to validate connectivity and isolation before moving critical infrastructure onto new networks.

Until validation and migration are complete, the existing trusted LAN remains in use and the planned DMZ is not considered a verified security boundary.

---

## Troubleshooting and Technical Challenges

### WireGuard Connectivity Validation

Remote VPN access required coordinating client configuration, encrypted tunneling, routing, and firewall behavior.

After configuring WireGuard, I tested connectivity from devices outside the home network.

Successful remote access confirmed that authorized clients could establish the tunnel and reach selected internal services.

**Result:** WireGuard remote access functioned successfully on tested clients.

**Lesson:** A successful VPN handshake is only one part of remote connectivity validation. Testing must also confirm that intended application traffic can traverse the tunnel.

### Remote Streaming Performance

Although WireGuard connectivity was functional, remote media streaming revealed performance limitations.

During troubleshooting, remote browser playback experienced recurring stuttering, and file-transfer testing over the VPN showed substantially lower throughput than expected.

Local media playback remained functional, helping distinguish application and media-file behavior from problems encountered specifically during remote access.

Troubleshooting included examining remote transfer performance and client-side network behavior.

The available testing did not establish a definitive root cause.

**Current status:** Remote VPN connectivity works, but the remote throughput limitation remains unresolved.

**Lesson:** Network reachability does not guarantee acceptable application performance. Throughput, latency, packet behavior, and the complete end-to-end path must be considered independently.

### VLAN Configuration Complexity

Preparing VLAN segmentation required coordinating configuration across OPNsense and UniFi.

VLAN tags identify logical networks, but creating matching VLAN definitions alone does not guarantee that traffic will reach the intended network.

Switch port configuration, tagged and untagged traffic, interface assignment, client addressing, and firewall rules must work together.

During preparation, I created the appropriate network definitions and configured the DMZ gateway interface.

I also prepared a temporary ICMP policy for a designated test client.

**Current status:** The configuration was saved, but the planned client connectivity and isolation tests were deferred.

**Lesson:** VLAN implementation must be validated at both the switching and firewall layers. A configuration appearing correct in an administrative interface is not sufficient evidence of segmentation.

### Change Management and Recovery Planning

Network changes create a risk of losing access to infrastructure management interfaces.

Before advancing the VLAN migration, I created backups of the relevant network and virtualization configurations and verified the availability of local management access.

This provided a recovery path if an interface, switch port, or firewall configuration caused unexpected connectivity loss.

**Lesson:** Changes to foundational infrastructure require backup procedures and a recovery method that does not depend entirely on the network being modified.

---

## Validation and Testing

### Operational Network Connectivity

Verified that the OPNsense gateway and UniFi switching infrastructure provided connectivity for the existing internal environment.

Confirmed that the virtualization host and hosted services could operate through the established network.

Verified access to infrastructure administration interfaces.

### Remote VPN Testing

Performed WireGuard connectivity tests using multiple client devices.

Validation included:

1. Establishing a VPN connection from a remote client.
2. Confirming access to selected internal resources.
3. Accessing self-hosted applications across the VPN.
4. Testing remote file and media access.
5. Comparing remote application behavior with local operation.

The testing demonstrated functional remote access while also revealing the unresolved throughput issue.

### Network Configuration Recovery Preparation

Exported infrastructure configurations before undertaking more disruptive network segmentation work.

Prepared for changes by maintaining local management access and preserving known working configurations.

### VLAN and DMZ Validation Status

The following implementation steps were completed:

- Created initial VLAN definitions.
- Configured matching UniFi networks.
- Assigned a DMZ interface and gateway.
- Prepared a temporary client-specific ICMP rule.
- Identified an unused switch port for testing.
- Backed up relevant configurations.

The following validation steps remain outstanding:

- Configure and verify the dedicated switch access port.
- Connect the designated test client.
- Confirm access to the DMZ gateway.
- Verify that traffic restrictions prevent unauthorized access to the trusted LAN.
- Review OPNsense firewall logs during permitted and denied traffic tests.
- Establish final segmentation rules before introducing public-facing workloads.

**No claim of successfully enforced DMZ isolation is made until these tests are completed.**

---

## Results and Outcomes

### Operational Network Infrastructure

Established a working network platform based on dedicated routing and firewall hardware, managed switching, and centrally administered network services.

The infrastructure supports an independent virtualization environment and multiple self-hosted applications.

### Secure Remote Connectivity

Deployed WireGuard and validated access to internal resources from devices outside the home network.

This introduced a practical encrypted remote-access capability for administration and selected services.

### Network Administration Experience

Developed practical experience with:

- Firewall interface configuration and administration.
- Routing and network addressing.
- DNS and DHCP services.
- Managed switching.
- VPN deployment and testing.
- Firewall rule planning.
- VLAN configuration.
- Network troubleshooting.
- Infrastructure change management.

### Foundation for Future Segmentation

Prepared the OPNsense and UniFi configurations required for future network segmentation.

Although segmentation validation remains incomplete, the configuration work established a foundation for isolating public-facing infrastructure from trusted personal and administrative systems.

---

## Known Limitations and Future Improvements

### Network Segmentation

The existing trusted network has not been fully migrated into the proposed VLAN-based architecture.

The planned DMZ has not yet passed connectivity and isolation validation.

**Planned improvement:** Complete client-side VLAN testing, verify firewall policy enforcement, and migrate appropriate infrastructure only after confirming the new network configuration behaves as expected.

### Remote VPN Throughput

WireGuard is operational, but the previously observed remote throughput limitation has not been fully diagnosed.

**Planned improvement:** Conduct additional controlled throughput tests, compare VPN and non-VPN performance, and isolate potential bottlenecks across the internet connection, VPN configuration, routing, and client devices.

### Single Firewall Appliance

The network relies on one primary physical firewall appliance.

A hardware failure could interrupt routing, internet connectivity, and locally hosted network services.

**Planned improvement:** Maintain recovery-ready configuration backups and evaluate replacement hardware or redundancy as resources permit.

### Public Infrastructure Hosting

The future self-hosted public infrastructure environment has not yet been deployed into the planned DMZ.

**Planned improvement:** Complete network segmentation validation before deploying public-facing applications. Evaluate Cloudflare Tunnel and application access controls to minimize direct exposure of internal infrastructure.

### Security Validation

Initial configuration and connectivity testing do not constitute a comprehensive network security assessment.

**Planned improvement:** Perform documented firewall rule reviews, isolation tests, and service exposure checks after the segmented network is operational.

---

## Lessons Learned

### Network Design Must Account for Dependencies

Routing, switching, DNS, DHCP, and firewall policies are interconnected.

Changing one component can affect the accessibility and behavior of other infrastructure services.

Understanding these dependencies is essential when planning maintenance or network migrations.

### A VPN Connection Is Not a Performance Guarantee

Successfully establishing an encrypted tunnel confirms connectivity but does not establish that all applications will perform adequately.

Remote throughput and application-specific behavior require their own validation.

### Segmentation Requires End-to-End Testing

Creating VLANs in both the firewall and switching interfaces is only part of implementing network isolation.

Effective segmentation also depends on correct port tagging, routing, firewall policies, and verification using actual client traffic.

### Independent Infrastructure Reduces Coupling

Using dedicated firewall hardware allows the primary network gateway to remain separate from the virtualization host.

This reduces dependency on virtual machine availability for basic network connectivity.

### Configuration Backups Are Essential

Maintaining recoverable configuration backups is particularly important when modifying routing, management networks, or switch port assignments.

Infrastructure changes should be planned with the assumption that a mistake could temporarily disrupt connectivity.

### Documenting Limitations Is Part of Engineering

An unfinished implementation should not be represented as a completed security control.

Recording unresolved issues and unverified configurations makes it easier to prioritize future improvements and prevents assumptions about capabilities that have not yet been demonstrated.

---

## Project Summary

This project established and maintained an independent networking environment using OPNsense, UniFi managed switching, local DNS and DHCP services, and WireGuard remote access.

The implementation provides functional routing, centralized network administration, and encrypted remote connectivity for selected internal resources.

It also introduced practical experience in VLAN planning, firewall policy configuration, troubleshooting, and infrastructure change management.

The planned segmented network architecture remains a future expansion, with connectivity and isolation testing required before it can be considered operational.

Together, these implementations demonstrate hands-on experience with network administration, firewall configuration, managed switching, VPN deployment, network services, and infrastructure security planning.
