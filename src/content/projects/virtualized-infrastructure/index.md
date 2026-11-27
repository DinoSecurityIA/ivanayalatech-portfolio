---
title: "Virtualized Infrastructure, Storage & Disaster Recovery"
summary: "Design and implementation of a Proxmox-based infrastructure environment with redundant ZFS storage, Linux virtualization, centralized file services, infrastructure monitoring, and validated disaster recovery procedures."
date: 2026-11-26
tags:
  - Proxmox
  - Linux
  - Virtualization
  - ZFS
  - Storage
  - Disaster Recovery
draft: false
---

## Project Overview

Designed and implemented an independent virtualized
infrastructure environment to host networked services,
centralize storage, and establish reliable backup and
recovery procedures.

The project encompasses the complete infrastructure
lifecycle, including hardware selection, storage
architecture, virtualization, service configuration,
monitoring, documentation, and recovery testing.

## Project Objectives

- Establish a centralized virtualization platform.
- Implement redundant storage infrastructure.
- Deploy isolated virtual machines and containers.
- Centralize file storage and access management.
- Implement infrastructure health monitoring.
- Establish and validate backup and recovery procedures.
- Reduce service dependencies and recovery complexity.

## Technologies Used

- Proxmox VE
- KVM and LXC
- ZFS
- Linux
- SMB and NFS
- Proxmox Backup Server
- SMART monitoring
- Bash
- Uptime Kuma

## Infrastructure Architecture

The environment is built around a dedicated Proxmox VE
host providing centralized compute, virtualization,
and storage resources.

### Compute Resources

- 12 logical processors
- 46 GiB of usable system memory
- Hardware-assisted virtualization
- Dedicated GPU for media workloads

### Storage Architecture

Storage is divided into three independent ZFS mirrored
pools based on workload requirements.

| Storage Pool | Configuration | Purpose |
| --- | --- | --- |
| Operating System | 2 x 120 GB SATA SSD | Proxmox VE |
| Virtual Machines | 2 x 256 GB NVMe SSD | VM and container storage |
| Media Storage | 2 x 16 TB HDD | Centralized file and media storage |

Separating these storage workloads reduces contention
between the operating system, virtualized applications,
and bulk file storage.

ZFS mirroring provides protection against individual
drive failures within each pool while supporting data
integrity verification and storage health monitoring.

### Virtualization Architecture

The environment uses both KVM virtual machines and LXC
containers to balance workload isolation, resource
efficiency, and application requirements.

- Dedicated Linux fileserver using an LXC container.
- Dedicated virtual machine for media services.
- Dedicated Linux virtual machine for containerized
  application workloads.
- Independent backup server for virtual machine and
  container recovery.

## Implementation

### Hardware Preparation

Assembled and prepared a dedicated virtualization host
using existing workstation hardware.

- Evaluated available compute, memory, and storage resources.
- Installed and configured additional storage devices.
- Performed drive health checks and extended SMART tests
  before placing storage into service.
- Identified and replaced an unusable SATA SSD.
- Installed Proxmox VE using mirrored system storage.

### Storage Configuration

Configured three independent ZFS mirrored storage pools
to separate operating system, virtual machine, and bulk
storage workloads.

Created dedicated datasets for centralized file storage
and established a consistent directory structure for
services requiring shared storage access.

### Virtualization and File Services

Deployed a combination of Linux virtual machines and
LXC containers based on application requirements.

Implemented a dedicated LXC fileserver to provide
centralized SMB and NFS access to shared storage.

Configured Linux ownership, group permissions, and
directory inheritance to maintain consistent access
across applications and systems.

### Backup Infrastructure

Repurposed separate physical hardware as a dedicated
Proxmox Backup Server.

Configured backup integration with the virtualization
host and established backup and restoration procedures
for virtualized workloads.

Validated recoverability through isolated restoration
tests before considering the backup implementation
operational.

### Infrastructure Monitoring

Implemented multiple layers of infrastructure monitoring:

- SMART drive health monitoring.
- ZFS pool health checks.
- Automated email notifications.
- Service availability monitoring through Uptime Kuma.
- Custom Bash-based health checks.
- Monitoring of expected storage pool availability.

### Service Dependency Management

Configured virtual machine and container startup and
shutdown ordering to ensure dependent applications
start after centralized file services become available.

Validated service availability following host restarts.

## Technical Decisions and Trade-offs

### ZFS Mirroring

Selected ZFS mirrors to provide drive-level redundancy,
data integrity verification, and straightforward
storage management.

This design prioritizes reliability over maximizing
usable storage capacity.

### Independent Storage Pools

Separated operating system, virtual machine, and bulk
storage workloads to allow independent management,
maintenance, and future expansion.

SSD and NVMe storage support system and application
workloads, while high-capacity hard drives provide
economical bulk storage.

### Virtual Machines versus Containers

Selected LXC containers for lightweight Linux services
that benefit from efficient resource utilization.

Selected virtual machines for application workloads
requiring stronger isolation, independent operating
system environments, and greater configuration
flexibility.

### Centralized Storage Management

Retained storage management on the Proxmox host rather
than introducing a virtualized NAS operating system.

This reduced architectural complexity while allowing
a dedicated fileserver to manage network access and
shared file permissions.

A separate physical NAS remains a potential future
infrastructure expansion.

### Dedicated Backup Hardware

Separated backup infrastructure from the primary
virtualization host to reduce dependence on a single
physical system.

This provides an independent recovery source in the
event of primary host or storage failure.

### Redundancy versus Backups

Recognized that mirrored storage protects against
individual drive failures but does not provide
complete protection against accidental deletion,
corruption, or catastrophic hardware loss.

Virtualized workloads are protected through dedicated
backup infrastructure. Independent backup coverage
for bulk media storage remains a known limitation
of the current environment.

## Troubleshooting and Technical Challenges

Throughout the deployment, several issues required hardware diagnostics, Linux troubleshooting, storage permission management, and recovery testing.

### Storage Hardware Compatibility

During initial hardware preparation, one of the SATA SSDs intended for the operating system mirror was found to be ATA security-locked and could not be used as planned.

Rather than proceed with an unreliable storage configuration, I investigated the drive's condition and replaced the affected device before completing the installation.

I also performed extended SMART tests on the high-capacity hard drives before placing them into production use.

**Resolution:** Replaced the unusable SATA SSD and verified the health of the storage devices before completing the mirrored ZFS configuration.

**Lesson:** Hardware validation is an important prerequisite for reliable infrastructure deployment. Identifying faults before placing systems into service reduces the risk of later recovery work.

### Linux File Permissions and Shared Storage

Centralizing file storage introduced challenges related to Linux ownership, group permissions, and access between virtual machines and containers.

LXC containers and full virtual machines handle user identity differently. An unprivileged LXC container can translate user and group IDs between the host and container, while a conventional virtual machine maintains its own independent user and group namespace.

This distinction mattered when configuring storage access for applications running across different environments.

I worked through Linux permission bits, group ownership, directory inheritance, and service-specific access requirements to establish consistent shared storage permissions.

**Resolution:**

- Established appropriate ownership and group permissions for shared directories.
- Configured directory group inheritance using the setgid permission bit.
- Configured SMB access for virtualized services.
- Verified application access to the intended storage locations.
- Validated shared storage operations without introducing unnecessary file duplication.

**Lesson:** Centralized storage requires a consistent identity and permissions strategy. Filesystem access must be considered across the host, containers, virtual machines, and application services.

### Service Startup Dependencies

Applications relying on centralized storage must not assume that their required filesystems will be available immediately after the virtualization host starts.

This was particularly important for the relationship between the Linux fileserver and the Jellyfin virtual machine.

Without deliberate startup ordering, dependent services can attempt to access storage before the fileserver or network mounts are ready.

**Resolution:**

Configured the virtualization platform to start the fileserver container before dependent application virtual machines.

The reverse order was established for shutdown, allowing application services to stop before the fileserver becomes unavailable.

Verified the configuration through host restart testing and confirmed that dependent services regained access to their storage.

**Lesson:** Infrastructure reliability depends on understanding dependencies between services, not simply ensuring that individual machines can start successfully.

### Storage Health Monitoring

Drive and storage-pool monitoring required more than checking whether the host itself remained reachable.

A running virtualization host can still have degraded storage, failed disks, or missing ZFS pools.

I implemented SMART monitoring alongside custom Bash-based ZFS health checks.

The ZFS monitoring approach checks an explicitly maintained list of expected storage pools, examines their reported health, and sends the result to Uptime Kuma.

The checks are designed to report problems when an expected pool is missing, inaccessible, or not reporting an ONLINE state.

**Resolution:**

- Configured SMART-based device monitoring.
- Established email notifications for infrastructure alerts.
- Created custom ZFS health monitoring scripts.
- Integrated health reporting with Uptime Kuma push monitors.
- Tested monitoring and alert behavior.

**Lesson:** Monitoring should verify the condition of critical resources rather than relying exclusively on basic host availability.

---

## Validation and Recovery Testing

Infrastructure changes were validated through functional testing, controlled restoration exercises, and service availability checks.

### Storage Validation

The storage implementation was validated through device health testing and ZFS pool checks.

Validation included:

- Extended SMART testing of the high-capacity storage devices.
- Verification that the expected ZFS pools were available and ONLINE.
- Verification of mounted storage and access permissions.
- Confirmation that virtualized services could access their required storage.
- Testing of monitoring and notification mechanisms.

SMART attributes and device health remain subject to ongoing monitoring because a successful test does not guarantee that a storage device will remain healthy indefinitely.

### Backup and Restoration Testing

Implemented Proxmox Backup Server on separate physical hardware and integrated it with the primary virtualization environment.

Rather than assuming that successfully creating a backup guaranteed recoverability, I performed restoration tests.

Validation included:

1. Creating backups of virtualized workloads.
2. Restoring representative workloads from the backup infrastructure.
3. Isolating restored environments from the production network.
4. Starting the restored systems.
5. Verifying successful operating system and application startup.
6. Checking that restored application services and Docker containers initialized as expected.
7. Removing temporary test environments after validation.

For an isolated application restoration test, the restored virtual machine's network interface was removed before startup to avoid interference with production services.

The restored Docker environment successfully initialized its containers.

These exercises demonstrated that selected workloads could be recovered from available backups. They did not constitute a complete simulation of losing the entire Proxmox host and all associated storage.

### ZFS Snapshot Validation

Tested ZFS snapshot functionality using controlled file changes and restoration procedures.

Verified that the original file contents could be recovered following the test.

This demonstrated the usefulness of snapshots for selected local recovery scenarios while reinforcing the distinction between a filesystem snapshot and an independently stored backup.

### Service Availability and Dependency Testing

Validated service behavior following maintenance and host restarts.

Testing included:

- Fileserver startup before dependent applications.
- Dependent application shutdown before the fileserver.
- Verification of SMB mounts.
- Validation of application storage availability.
- Monitoring of restored service availability through Uptime Kuma.

The configured ordering successfully supported dependent services following tested restarts.

### Monitoring and Notification Validation

Verified the operation of infrastructure monitoring and alert delivery.

Testing covered:

- Proxmox notification delivery.
- SMART monitoring configuration.
- ZFS health monitoring.
- Uptime Kuma push monitor updates.
- Application and infrastructure availability checks.

These tests established a monitoring baseline for detecting selected infrastructure failures and service interruptions.

---

## Results and Outcomes

The project established an operational virtualization and shared-storage platform capable of supporting multiple independent infrastructure services.

### Infrastructure Deployment

- Deployed Proxmox VE on dedicated workstation hardware.
- Configured three mirrored ZFS storage pools.
- Established a combination of KVM virtual machines and LXC containers.
- Implemented centralized file storage and access management.
- Integrated dedicated physical backup hardware.
- Configured infrastructure monitoring and alerting.
- Established startup and shutdown ordering for dependent services.

### Recovery and Reliability

- Successfully created and restored virtualized workload backups.
- Validated representative restored environments in isolation.
- Tested local snapshot restoration.
- Verified dependent service behavior following host restarts.
- Established automated monitoring for critical infrastructure components.

### Operational Improvements

Centralizing virtualization, storage, and monitoring provided a consistent environment for deploying and maintaining services.

Documented configurations, repeatable backup procedures, and automated health checks reduced reliance on manual inspection and made the environment easier to administer.

The platform also became the foundation for additional independent infrastructure projects, including containerized services, media management, monitoring, and networked applications.

### Demonstrated Technical Competencies

This project required practical application of:

- Server hardware preparation and diagnostics.
- Linux systems administration.
- Hypervisor installation and configuration.
- Virtual machine and container management.
- ZFS storage administration.
- Network file services and Linux permissions.
- Backup planning and recovery validation.
- Bash scripting and monitoring automation.
- Service dependency management.
- Technical troubleshooting and documentation.

---

## Known Limitations and Future Improvements

Although the environment is operational, several limitations remain.

### Media Storage Backup Coverage

The bulk media storage pool currently relies on ZFS mirroring without a complete independent backup.

Mirroring provides protection against an individual drive failure but does not protect against every form of data loss.

**Planned improvement:** Expand backup capacity and establish independent backup coverage for critical media and other datasets when additional storage resources become available.

### Single Virtualization Host

The environment currently relies on a single primary Proxmox host.

While individual storage devices are mirrored, host-level hardware failure would still interrupt the virtualized workloads.

**Planned improvement:** Evaluate additional compute hardware and recovery options as the infrastructure expands.

High availability has not been implemented and is not claimed as a current capability.

### Backup Recovery Scope

Successful restoration tests verified recoverability for selected virtualized workloads, but a complete host-loss disaster recovery exercise has not been performed.

Recovery time objectives and recovery point objectives have not been formally measured.

**Planned improvement:** Document recovery procedures and test recovery from a simulated complete host failure, including verification of backup datastore independence and required infrastructure dependencies.

### Dedicated NAS Infrastructure

The Proxmox host currently manages the primary ZFS media storage.

This approach reduces immediate infrastructure complexity but also ties storage availability to the virtualization host.

**Planned improvement:** Evaluate migration to a dedicated physical NAS, potentially using TrueNAS, to separate storage administration from virtualization workloads.

### GPU Acceleration

A dedicated AMD Radeon RX 6600 is installed in the virtualization host.

GPU passthrough and media hardware acceleration were investigated but remain deferred. The current infrastructure does not depend on successful GPU passthrough for its core operations.

**Planned improvement:** Revisit hardware passthrough and acceleration when workload requirements justify additional troubleshooting and configuration.

---

## Lessons Learned

### Architecture Decisions Should Reflect Actual Requirements

Separating workloads across virtual machines, containers, and storage pools provided opportunities to evaluate different approaches to isolation, resource management, and operational complexity.

Not every workload benefits from the same deployment model.

The appropriate solution depends on its security requirements, resource consumption, storage dependencies, and administrative overhead.

### Recovery Must Be Tested

A successful backup job does not by itself demonstrate that a system can be restored.

Controlled restoration testing helped identify the distinction between backup creation, operating system recovery, application startup, and complete service availability.

Recovery validation should be incorporated into infrastructure maintenance rather than treated as an optional final step.

### Monitoring Requires Multiple Layers

Host availability monitoring alone cannot identify every infrastructure problem.

Combining device health checks, storage-pool monitoring, service availability checks, and automated notifications provides more useful operational visibility.

Custom health checks also allow monitoring to reflect the specific components and dependencies that matter to the environment.

### Storage Permissions Are an Architectural Consideration

Centralized storage introduced challenges that were not immediately apparent during initial application deployment.

Understanding Linux user IDs, group permissions, directory inheritance, and virtualization-specific identity handling became essential for maintaining consistent file access.

Planning permissions and storage ownership early can prevent extensive troubleshooting as additional services are introduced.

### Simplicity Improves Maintainability

Several architectural decisions deliberately avoided additional infrastructure components when existing solutions could meet the requirements.

Examples included retaining ZFS administration on the Proxmox host and deploying a lightweight fileserver container rather than introducing a separate virtualized NAS platform.

This approach reduced initial complexity while retaining a path for future expansion.

### Documentation Supports Long-Term Operations

Documenting configurations, troubleshooting decisions, backup procedures, and validation results made it easier to revisit previous work and maintain consistency across the environment.

The project reinforced the importance of treating documentation as part of infrastructure engineering rather than an administrative task performed after deployment.

---

## Project Summary

This project established a virtualized infrastructure platform designed around storage redundancy, workload isolation, centralized management, monitoring, and recoverability.

Beyond deploying a hypervisor, the implementation required integrating hardware, storage, operating systems, network services, backup infrastructure, and operational monitoring into a functioning environment.

The most important outcomes were the successful deployment of the infrastructure, implementation of centralized storage and permissions, establishment of recovery procedures, and validation of critical service dependencies.

The environment continues to serve as the foundation for additional infrastructure projects and provides practical experience in systems administration, virtualization, storage management, troubleshooting, and disaster recovery planning.
