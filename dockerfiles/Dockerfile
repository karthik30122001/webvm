FROM --platform=linux/i386 docker.io/i386/debian:buster

ARG DEBIAN_FRONTEND=noninteractive

# Full bookworm already ships GNU coreutils/findutils/grep/sed/gawk.
# We add: man pages (so `man grep` works — a Group 1 skill), a pager,
# friendly editors, and the login/passwd tooling for the su mechanic.
RUN printf '%s\n' \
  'deb [trusted=yes] http://archive.debian.org/debian buster main contrib non-free' \
  'deb [trusted=yes] http://archive.debian.org/debian-security buster/updates main contrib non-free' \
  > /etc/apt/sources.list

RUN echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/10no-check-valid

RUN apt-get update && apt-get -y upgrade && \
    apt-get install -y \
        systemd systemd-sysv udev \
        libpam-modules login \
        ca-certificates \
        procps less nano vim curl \
        python3 \
        man-db manpages
# WebVM REQUIRES a user named "user" to boot correctly. Do not remove.
RUN useradd -m user && echo "user:password" | chpasswd
RUN echo 'root:password' | chpasswd

# ---------------------------------------------------------------------------
# Puzzle chain — first two levels, for the su-gating EXPERIMENT.
# bandit-style: each level's password is the reward that unlocks the next user.
# ---------------------------------------------------------------------------
RUN useradd -m -s /bin/bash bioseq0 && echo 'bioseq0:level0pass' | chpasswd && \
    useradd -m -s /bin/bash bioseq1 && echo 'bioseq1:level1pass' | chpasswd

COPY dockerfiles/dir/home/ /home/

# Locking down permissions for users
RUN for u in /home/bioseq*; do \
        name=$(basename "$u"); \
        chown -R "$name":"$name" "$u"; \
        chmod 700 "$u"; \
    done


USER bioseq0
WORKDIR /home/bioseq0
CMD ["/bin/bash"]
