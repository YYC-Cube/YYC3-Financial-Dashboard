#!/bin/bash

# YYC³ Financial Dashboard - Pre-commit Quality Check Script
# 自动化质量检查脚本 | Automated quality check script
# Version: 2.0.0

set -e

# 颜色定义 Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 计数器 Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_COUNT=0

# 辅助函数 Helper functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASSED_CHECKS++))
    ((TOTAL_CHECKS++))
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    ((FAILED_CHECKS++))
    ((TOTAL_CHECKS++))
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}
    ((WARNING_COUNT++))
    ((TOTAL_CHECKS++))
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 开始检查 Start checks
echo -e "\n${BLUE}🚀 YYC³ Financial Dashboard - Quality Checks${NC}"
echo -e "${BLUE}========================================${NC}\n"

print_info "Starting comprehensive quality checks..."
print_info "Time: $(date '+%Y-%m-%d %H:%M:%S')\n"

# 1. ESLint 检查 ESLint check
print_header "1️⃣  ESLint Code Quality Check"
if pnpm lint 2>&1; then
    print_success "ESLint: No errors found"
else
    LINT_RESULT=$(pnpm lint 2>&1 || true)
    ERROR_COUNT=$(echo "$LINT_RESULT" | grep -c "error" || echo "0")
    WARNING_COUNT_LINT=$(echo "$LINT_RESULT" | grep -c "warning" || echo "0")
    
    if [ "$ERROR_COUNT" -gt 0 ]; then
        print_error "ESLint: $ERROR_COUNT errors found"
        echo "$LINT_RESULT" | grep "error" | head -10
    else
        print_warning "ESLint: Passed with $WARNING_COUNT_LINT warnings"
    fi
fi

# 2. TypeScript 类型检查 TypeScript type check
print_header "2️⃣  TypeScript Type Check"
if pnpm tsc --noEmit 2>&1; then
    print_success "TypeScript: No type errors"
else
    TSC_RESULT=$(pnpm tsc --noEmit 2>&1 || true)
    ERROR_COUNT=$(echo "$TSC_RESULT" | grep -c "error TS" || echo "0")
    print_error "TypeScript: $ERROR_COUNT type errors"
    echo "$TSC_RESULT" | grep "error TS" | head -10
fi

# 3. 构建检查 Build check
print_header "3️⃣  Production Build Check"
print_info "Building for production (this may take a moment)..."
START_TIME=$(date +%s)

if pnpm build 2>&1; then
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    
    # 收集构建指标 Collect build metrics
    COMPILE_TIME=$(grep "Compiled successfully" build-log.txt 2>/dev/null | grep -oP '\d+ms' || echo "N/A")
    PAGE_COUNT=$(find ./out -name "*.html" ! -name "_*" 2>/dev/null | wc -l | tr -d ' ' || echo "N/A")
    TOTAL_SIZE=$(du -sh ./out 2>/dev/null | cut -f1 || echo "N/A")
    
    print_success "Build: Completed in ${DURATION}s"
    print_info "   Compile time: $COMPILE_TIME"
    print_info "   Pages generated: $PAGE_COUNT"
    print_info "   Total size: $TOTAL_SIZE"
else
    print_error "Build: Failed"
fi

# 4. 安全审计 Security audit (optional)
print_header "4️⃣  Security Audit"
if command -v pnpm &> /dev/null; then
    if pnpm audit --audit-level=high 2>&1; then
        print_success "Security: No high/critical vulnerabilities"
    else
        AUDIT_RESULT=$(pnpm audit --audit-level=high 2>&1 || true)
        VULN_COUNT=$(echo "$AUDIT_RESULT" | grep -c "vulnerability" || echo "0")
        
        if [ "$VULN_COUNT" -gt 0 ]; then
            print_warning "Security: $VULN_COUNT vulnerabilities found (review recommended)"
        else
            print_success "Security: Audit passed"
        fi
    fi
else
    print_warning "Security: pnpm not found, skipping audit"
fi

# 5. 文件大小检查 File size check (optional)
print_header "5️⃣  Bundle Size Analysis"
if [ -d "./out" ]; then
    TOTAL_SIZE=$(du -sh ./out 2>/dev/null | cut -f1)
    HTML_SIZE=$(du -sh ./out/*.html 2>/dev/null | tail -1 | cut -f1 || echo "0B")
    JS_SIZE=$(du -sh ./out/_next 2>/dev/null | cut -f1 || echo "0B")
    
    print_info "Bundle Size Breakdown:"
    print_info "   Total: $TOTAL_SIZE"
    print_info "   HTML: $HTML_SIZE"
    print_info "   JS/Assets: $JS_SIZE"
    
    # 警告阈值 Warning thresholds
    SIZE_IN_MB=$(du -m ./out 2>/dev/null | cut -f1 || echo "0")
    if [ "$SIZE_IN_MB" -gt 10 ]; then
        print_warning "Bundle size exceeds 10MB ($SIZE_IN_MB MB)"
    else
        print_success "Bundle size within acceptable range (< 10MB)"
    fi
else
    print_warning "No build output found, skipping size analysis"
fi

# 生成报告 Generate summary report
print_header "📊 Quality Check Summary"
echo ""
echo -e "${BLUE}┌─────────────────────────────────────┐${NC}"
echo -e "${Blue}│         CHECK RESULTS               │${NC}"
echo -e "${BLUE}├─────────────────────────────────────┤${NC}"
printf "${BLUE}│${NC}  Total Checks:  %-20s${BLUE}│${NC}\n" "$TOTAL_CHECKS"
printf "${BLUE}│${NC}  ${GREEN}✅ Passed:${NC}      %-20s${BLUE}│${NC}\n" "$PASSED_CHECKS"
printf "${BLUE}│${NC}  ${RED}❌ Failed:${NC}      %-20s${BLUE}│${NC}\n" "$FAILED_CHECKS"
printf "${BLUE}│${NC}  ${YELLOW}⚠️  Warnings:${NC}    %-20s${BLUE}│${NC}\n" "$WARNING_COUNT"
echo -e "${BLUE}└─────────────────────────────────────┘${NC}"
echo ""

# 最终结果 Final result
if [ "$FAILED_CHECKS" -gt 0 ]; then
    echo -e "${RED}❌ Quality checks FAILED${NC}"
    echo -e "${RED}Please fix the errors before committing.${NC}"
    exit 1
else
    if [ "$WARNING_COUNT" -gt 0 ]; then
        echo -e "${YELLOW}⚠️  Quality checks passed with warnings${NC}"
        echo -e "${YELLOW}Review warnings before committing.${NC}"
        exit 0
    else
        echo -e "${GREEN}🎉 All quality checks PASSED!${NC}"
        echo -e "${Green}Ready to commit and push.${NC}"
        exit 0
    fi
fi
