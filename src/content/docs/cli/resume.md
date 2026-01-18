---
title: resume - Resume Interrupted Jobs
description: Resume interrupted scraping jobs from checkpoints and manage resumable job history
section: cli
order: 10
---

# resume - Resume Interrupted Jobs

Resume interrupted scraping jobs from saved checkpoints and manage job history.

## Basic Usage

```bash
skill-seekers resume [OPTIONS] [JOB_ID]
```

## Quick Examples

```bash
# List all resumable jobs
skill-seekers resume --list

# Resume specific job by ID
skill-seekers resume abc123def456

# Clean up old job files
skill-seekers resume --clean

# View job details
skill-seekers resume --list --verbose
```

## Options

### Actions

- `--list` - List all resumable jobs with progress details
- `--clean` - Clean up old job files (respects config settings)
- `JOB_ID` - Resume specific job from checkpoint

### Display Options

- `--verbose` - Show detailed job information
- `--format FORMAT` - Output format: table, json, simple (default: table)

## Resume Feature

### When Jobs are Saved

Skill Seekers automatically saves progress for resumable operations:

**Auto-saved operations:**
- Documentation scraping (checkpoint every N pages)
- GitHub repository analysis (checkpoint after each phase)
- PDF extraction (checkpoint after each file)
- Multi-source unified scraping (checkpoint per source)

**Save interval:**
- Default: 60 seconds
- Configurable: `skill-seekers config` → Resume Settings

### Progress Storage

**Location:**
```
~/.local/share/skill-seekers/progress/<job-id>.json
```

**Job File Structure:**
```json
{
  "job_id": "abc123def456",
  "command": "skill-seekers github --repo facebook/react",
  "started_at": "2026-01-18T10:30:00Z",
  "last_updated": "2026-01-18T10:45:00Z",
  "progress": {
    "phase": "Code Analysis",
    "files_processed": 1234,
    "files_total": 2000,
    "percent_complete": 61.7
  },
  "checkpoints": {
    "scraping_complete": true,
    "analysis_phase_1": true,
    "analysis_phase_2": false
  },
  "metadata": {
    "repo": "facebook/react",
    "output_dir": "output/react"
  }
}
```

## Listing Jobs

### Basic List

```bash
skill-seekers resume --list
```

**Output:**
```
Resumable Jobs (3 found)
─────────────────────────────────────────────────────────────────

JOB ID: abc123def456
Started: 2026-01-18 10:30:00
Command: skill-seekers github --repo facebook/react
Progress: Code Analysis (61.7% - 1234/2000 files)
Last Updated: 2 minutes ago

JOB ID: def456ghi789
Started: 2026-01-17 15:20:00
Command: skill-seekers scrape https://docs.astro.build
Progress: Scraping (450/500 pages)
Last Updated: 1 day ago

JOB ID: ghi789jkl012
Started: 2026-01-16 09:00:00
Command: skill-seekers unified --config configs/godot_full.json
Progress: Source 2 of 3 (GitHub Analysis)
Last Updated: 2 days ago
```

### Verbose List

```bash
skill-seekers resume --list --verbose
```

**Shows additional details:**
- Full command with arguments
- All checkpoint statuses
- Estimated time remaining
- Output directory path
- Error logs (if any)

### JSON Format

```bash
skill-seekers resume --list --format json
```

**Use cases:**
- Scripting and automation
- Integration with other tools
- Parsing in CI/CD pipelines

## Resuming Jobs

### Resume by Job ID

```bash
skill-seekers resume abc123def456
```

**What happens:**
1. Loads job metadata from progress file
2. Validates checkpoint integrity
3. Resumes from last successful checkpoint
4. Continues operation as normal
5. Updates progress file automatically

### Resume Latest Job

```bash
# List and resume the most recent job
skill-seekers resume --list
skill-seekers resume $(skill-seekers resume --list --format json | jq -r '.[0].job_id')
```

### Resume After Rate Limit

If a GitHub scraping job hit rate limits:

```bash
# Check job status
skill-seekers resume --list

# Wait for rate limit reset or switch profile
skill-seekers config --github  # Add another profile

# Resume with different profile
skill-seekers resume abc123def456 --profile work
```

## Clean Up

### Auto-Cleanup

Configured in `skill-seekers config`:

**Default settings:**
- Auto-cleanup age: 7 days
- Jobs older than 7 days are automatically removed on next run

### Manual Cleanup

```bash
# Remove all jobs older than configured age
skill-seekers resume --clean
```

**Output:**
```
Cleaning up old job files...
✓ Removed abc123def456 (started 10 days ago)
✓ Removed def456ghi789 (started 15 days ago)
Kept ghi789jkl012 (started 2 days ago)

Cleaned up 2 job files.
```

### Force Cleanup All

```bash
# Remove all job files regardless of age
skill-seekers resume --clean --all
```

**Warning:** This deletes ALL resumable jobs, including recent ones.

## Resume Scenarios

### Scenario 1: Network Interruption

**Problem:** Internet disconnected during documentation scraping

```bash
# Original command
skill-seekers scrape https://docs.django.com --max-pages 1000

# ... network interruption at page 450 ...

# Resume after network restored
skill-seekers resume --list
skill-seekers resume abc123def456
```

**Result:** Resumes from page 450, skips already-scraped pages

### Scenario 2: Rate Limit Hit

**Problem:** GitHub API rate limit exceeded during repository analysis

```bash
# Original command
skill-seekers github --repo microsoft/vscode

# ... rate limit hit after 30 minutes ...

# Option 1: Wait and resume
# (waits for rate limit reset)
skill-seekers resume abc123def456

# Option 2: Switch profile and resume
skill-seekers config --github  # Add new profile
skill-seekers resume abc123def456 --profile work
```

**Result:** Continues analysis from last checkpoint

### Scenario 3: System Crash

**Problem:** Computer crashed during unified scraping

```bash
# Original command
skill-seekers unified --config configs/godot_full.json

# ... system crash ...

# After reboot, list jobs
skill-seekers resume --list

# Resume from checkpoint
skill-seekers resume abc123def456
```

**Result:** Resumes from last auto-save (default: 60 seconds)

### Scenario 4: Manual Cancellation

**Problem:** Accidentally canceled long-running job

```bash
# Press Ctrl+C during execution

# Later, resume it
skill-seekers resume --list
skill-seekers resume abc123def456
```

**Result:** Picks up where it left off

## Progress Tracking

### Understanding Progress

**Phase indicators:**
- `Initialization` - Setting up scraping environment
- `Scraping` - Fetching pages/files
- `Code Analysis` - AST parsing (GitHub repos only)
- `C3.x Analysis` - Design patterns, test extraction (if enabled)
- `Enhancement` - AI enhancement phase
- `Packaging` - Finalizing skill package

**Progress metrics:**
- Files/pages processed vs total
- Percent complete
- Current phase
- Estimated time (verbose mode)

### Real-Time Updates

While running, resumed jobs show progress:

```
Resuming job abc123def456...
Loaded checkpoint: Code Analysis (phase 1 complete)

Processing files: [████████░░░░░░░░] 1500/2000 (75%)
Current file: src/components/Button.tsx
Elapsed: 45m 23s | Remaining: ~15m 12s
```

## Resume Configuration

Configure resume behavior in `skill-seekers config`:

### Auto-Save Interval

**Default:** 60 seconds

```bash
skill-seekers config
# → Select "4. Resume Settings"
# → Select "Auto-save interval"
# → Enter new value (30-300 seconds recommended)
```

**Trade-offs:**
- Lower interval (30s) - More frequent saves, better resume granularity, slight performance impact
- Higher interval (120s) - Less frequent saves, may lose more progress on crash

### Auto-Cleanup Age

**Default:** 7 days

```bash
skill-seekers config
# → Select "4. Resume Settings"
# → Select "Auto-cleanup age"
# → Enter new value (1-30 days recommended)
```

**Recommendations:**
- Development: 7 days (default)
- CI/CD: 1 day (clean up quickly)
- Production: 14 days (keep longer history)

## Limitations

### Not Resumable

These operations cannot be resumed:
- `enhance` command (API-based enhancement)
- `package` command (fast operation)
- `upload` command (quick upload)

### Partial Resume

These operations resume with limitations:
- **AI enhancement (LOCAL mode)** - Resumes per-file, may re-enhance some files
- **Parallel scraping** - May re-scrape pages from interrupted batch

## Integration with Other Commands

### GitHub Command

```bash
# Start GitHub scraping
skill-seekers github --repo facebook/react

# If interrupted, resume it
skill-seekers resume <job-id>

# Resume with different options
skill-seekers resume <job-id> --profile work --non-interactive
```

### Unified Command

```bash
# Start multi-source scraping
skill-seekers unified --config configs/framework.json

# If interrupted during source 2, resume
skill-seekers resume <job-id>

# Continue from checkpoint: source 2 analysis
```

## Troubleshooting

### Job Not Found

```bash
# Verify job exists
skill-seekers resume --list

# Check progress file location
ls -la ~/.local/share/skill-seekers/progress/

# Recreate progress directory if missing
mkdir -p ~/.local/share/skill-seekers/progress/
```

### Corrupted Checkpoint

```bash
# If resume fails with "corrupted checkpoint":

# Option 1: Start fresh
skill-seekers github --repo owner/repo --output output/repo_new

# Option 2: Delete corrupted checkpoint
rm ~/.local/share/skill-seekers/progress/<job-id>.json
```

### Permission Error

```bash
# Fix permissions on progress directory
chmod 700 ~/.local/share/skill-seekers/progress/
chmod 600 ~/.local/share/skill-seekers/progress/*.json
```

## Best Practices

1. **Check job list regularly** - Use `--list` to see pending jobs
2. **Clean up old jobs** - Run `--clean` monthly to free disk space
3. **Use verbose mode for debugging** - `--list --verbose` shows full details
4. **Resume promptly** - Jobs older than cleanup age are auto-removed
5. **Verify checkpoints** - Resume command validates integrity before continuing
6. **Use shorter auto-save intervals** - For unstable networks or systems
7. **Keep job history** - For production, increase cleanup age to 14-30 days

## See Also

- [config command](/docs/cli/config) - Configure resume settings
- [github command](/docs/cli/github) - GitHub repository scraping
- [Rate Limit Management](/docs/guides/rate-limit-management) - Handling rate limits with resume
