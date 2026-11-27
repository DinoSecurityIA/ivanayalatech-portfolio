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
